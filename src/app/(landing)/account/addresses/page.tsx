"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft, IconMapPin, IconPlus, IconTrash, IconEdit, IconStar, IconLocation } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import BottomSheet from "@/app/_components/BottomSheet";
import NeshanMap from "@neshan-maps-platform/react-openlayers";

interface SelectedLocation {
  lat: number;
  lng: number;
}

const AddressesPage = () => {
  const router = useRouter();
  const mapRef = useRef<unknown>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [addressDetails, setAddressDetails] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const addresses = [
    {
      id: 1,
      title: "خانه",
      address: "تهران، خیابان ولیعصر، پلاک 123",
      isDefault: true
    },
    {
      id: 2,
      title: "دفتر کار",
      address: "تهران، خیابان انقلاب، ساختمان تجاری، طبقه 4",
      isDefault: false
    }
  ];

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setIsLoading(true);
    
    console.log('Selected location:', { lat, lng });
    
    try {
      // Convert Web Mercator coordinates to WGS84 if needed
      let finalLat = lat;
      let finalLng = lng;
      
      // Check if coordinates are in Web Mercator format (large numbers)
      if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        console.log('Converting Web Mercator coordinates to WGS84...');
        // Convert Web Mercator to WGS84 - Fixed formula
        const earthRadius = 6378137;
        const maxExtent = earthRadius * Math.PI;
        
        finalLat = (2 * Math.atan(Math.exp(lat / earthRadius)) - Math.PI / 2) * (180 / Math.PI);
        finalLng = (lng / maxExtent) * 180;
        
        console.log('Converted coordinates:', { 
          original: { lat, lng }, 
          converted: { lat: finalLat, lng: finalLng }
        });
      }
      
      // Check if coordinates are within Iran's bounds
      const isWithinIran = finalLat >= 25 && finalLat <= 40 && finalLng >= 44 && finalLng <= 64;
      
      if (!isWithinIran) {
        console.log('Coordinates outside Iran bounds, using Tehran coordinates as fallback');
        finalLat = 35.6892;
        finalLng = 51.3890;
      }
      
      // Try direct API call first
      let response;
      try {
        response = await fetch(`https://api.neshan.org/v5/reverse?lat=${finalLat}&lng=${finalLng}`, {
          method: 'GET',
          headers: {
            'Api-Key': 'service.133cf129eadd46c5958571776318ce57',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
      } catch {
        console.log('CORS error, trying with proxy...');
        // If CORS fails, try with a proxy
        response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.neshan.org/v5/reverse?lat=${finalLat}&lng=${finalLng}`, {
          method: 'GET',
          headers: {
            'Api-Key': 'service.133cf129eadd46c5958571776318ce57',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      let formattedAddress = "";
      
      if (data.formatted_address) {
        formattedAddress = data.formatted_address;
      } else {
        const addressParts: string[] = [];
        
        if (data.state) addressParts.push(data.state);
        if (data.city) addressParts.push(data.city);
        if (data.district) addressParts.push(data.district);
        if (data.neighbourhood) addressParts.push(data.neighbourhood);
        if (data.route_name) addressParts.push(data.route_name);
        if (data.route_type) addressParts.push(data.route_type);
        
        if (addressParts.length > 0) {
          formattedAddress = addressParts.join('، ');
        }
      }
      
      if (formattedAddress) {
        setAddressDetails(formattedAddress);
      } else {
        setAddressDetails("آدرس یافت نشد");
      }
    } catch (error) {
      console.error('API Call Error:', error);
      // Fallback to coordinates if API fails
      const fallbackAddress = `موقعیت انتخاب شده: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setAddressDetails(fallbackAddress);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('مرورگر شما از GPS پشتیبانی نمی‌کند');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', { latitude, longitude });
        
        // Set selected location
        setSelectedLocation({ lat: latitude, lng: longitude });
        
        // Move map to current location
        if (mapRef.current) {
          const map = mapRef.current;
          const view = map.getView();
          view.animate({
            center: [longitude, latitude],
            zoom: 16,
            duration: 1000
          });
        }
        
        // Get address for current location
        handleMapClick(latitude, longitude);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'خطا در دریافت موقعیت';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'دسترسی به موقعیت رد شد. لطفاً مجوز دسترسی به موقعیت را فعال کنید.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'اطلاعات موقعیت در دسترس نیست.';
            break;
          case error.TIMEOUT:
            errorMessage = 'زمان دریافت موقعیت به پایان رسید.';
            break;
        }
        
        alert(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, [handleMapClick]);

  const handleSaveAddress = () => {
    if (addressTitle && addressDetails) {
      console.log('Saving address:', { title: addressTitle, address: addressDetails, location: selectedLocation });
      setIsAddAddressOpen(false);
      setAddressTitle("");
      setAddressDetails("");
      setSelectedLocation(null);
    }
  };

  const onMapInit = useCallback((map: unknown) => {
    console.log('Map initialized!', map);
    const mapInstance = map as { on: (event: string, callback: (event: { coordinate: [number, number] }) => void) => void };
    mapInstance.on('click', (event: { coordinate: [number, number] }) => {
      const coordinate = event.coordinate;
      const lat = coordinate[1];
      const lng = coordinate[0];
      handleMapClick(lat, lng);
    });
  }, [handleMapClick]);

  // Clean up when closing bottom sheet
  useEffect(() => {
    if (!isAddAddressOpen) {
      setSelectedLocation(null);
      setAddressDetails("");
      setAddressTitle("");
    }
  }, [isAddAddressOpen]);

  return (
    <div className="px-4 pt-28 flex flex-col gap-6 min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <Typography variant={"paragraph/md"} className="self-center" weight="bold">آدرس ها</Typography>
        <div 
          className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => router.back()}
        >
          <IconChevronLeft size={24} className="text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Add New Address Button */}
        <button 
          onClick={() => setIsAddAddressOpen(true)}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
        >
          <IconPlus size={20} />
          <Typography variant={"paragraph/md"} weight="bold">
            افزودن آدرس جدید
          </Typography>
        </button>

        {/* Addresses List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    address.isDefault ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <IconMapPin size={24} className={
                      address.isDefault ? "text-primary" : "text-muted-foreground"
                    } />
                  </div>
                  <div>
                    <Typography variant={"paragraph/sm"} weight="bold" className="text-foreground">
                      {address.title}
                    </Typography>
                    <Typography variant={"paragraph/xs"} className="text-muted-foreground">
                      {address.address}
                    </Typography>
                  </div>
                </div>
                {address.isDefault && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                    <IconStar size={12} />
                    پیش‌فرض
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-primary/10 text-primary py-2 rounded-xl text-xs font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1">
                  <IconEdit size={14} />
                  ویرایش
                </button>
                <button className="flex-1 bg-muted text-muted-foreground py-2 rounded-xl text-xs font-bold hover:bg-muted/80 transition-colors flex items-center justify-center gap-1">
                  <IconStar size={14} />
                  پیش‌فرض
                </button>
                <button className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
                  <IconTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address BottomSheet */}
      <BottomSheet
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
      >
        <div className="p-6 space-y-6" dir="rtl">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconLocation size={32} className="text-primary" />
            </div>
            <Typography variant={"paragraph/md"} weight="bold" className="text-foreground">
              افزودن آدرس جدید
            </Typography>
          </div>
          
          {/* Title Input */}
          <div>
            <Typography variant={"paragraph/sm"} weight="bold" className="mb-3 text-foreground">
              عنوان آدرس
            </Typography>
            <input
              type="text"
              value={addressTitle}
              onChange={(e) => setAddressTitle(e.target.value)}
              placeholder="مثال: خانه، دفتر کار"
              className="w-full p-4 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground"
            />
          </div>

          {/* Neshan Map */}
          <div>
            <Typography variant={"paragraph/sm"} weight="bold" className="mb-3 text-foreground">
              انتخاب موقعیت روی نقشه
            </Typography>
            <div className="h-64 rounded-2xl overflow-hidden border border-border relative">
              <NeshanMap
                ref={mapRef}
                mapKey="web.fd5c5f700ad64865aa83da3a0fabbb63"
                defaultType="neshan"
                center={{ latitude: 35.6892, longitude: 51.3890 }}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                onInit={onMapInit}
                traffic={false}
                poi={false}
              />
              
              {/* My Location Button */}
              <button
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="absolute top-4 left-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                title="موقعیت من"
              >
                {isGettingLocation ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <IconLocation size={20} className="text-primary" />
                )}
              </button>
            </div>
            <div className="mt-2">
              <Typography variant={"paragraph/xs"} className="text-muted-foreground text-center">
                برای انتخاب آدرس، روی نقشه کلیک کنید
              </Typography>
            </div>
          </div>

          {/* Address Details */}
          {addressDetails && (
            <div>
              <Typography variant={"paragraph/sm"} weight="bold" className="mb-3 text-foreground">
                آدرس دقیق
              </Typography>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <Typography variant={"paragraph/sm"} className="text-primary">
                  {isLoading ? "در حال دریافت آدرس..." : addressDetails}
                </Typography>
              </div>
            </div>
          )}

          {/* Manual Address Input */}
          <div>
            <Typography variant={"paragraph/sm"} weight="bold" className="mb-3 text-foreground">
              یا آدرس را دستی وارد کنید
            </Typography>
            <textarea
              value={addressDetails}
              onChange={(e) => setAddressDetails(e.target.value)}
              placeholder="آدرس کامل خود را اینجا وارد کنید..."
              className="w-full p-4 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground min-h-[100px] resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAddress}
            disabled={!addressTitle || !addressDetails}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold disabled:bg-muted disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
          >
            <Typography variant={"paragraph/md"} weight="bold">
              ذخیره آدرس
            </Typography>
          </button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default AddressesPage; 