"use client";

import {
  IconAlertSquareRounded,
  IconChevronLeft,
  IconEdit,
  IconLocation,
  IconMapPin,
  IconPlus,
  IconStar,
  IconTrash,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
} from "@/components/components/atoms/alertDialog";
import {
  AccountAddressesObj,
  useGetAccountAddressList,
} from "@/utils/apis/account/addresses/GET/accountAddressesListGetApi";
import { useDeleteAccountAddress } from "@/utils/apis/account/addresses/DELETE/accountAddressesDeleteApi";
import { usePostAccountAddress } from "@/utils/apis/account/addresses/POST/accountAddressesPostApi";
import { usePutAccountAddress } from "@/utils/apis/account/addresses/PUT/accountAddressesPutApi";
import { BaseInput } from "@/components/components/atoms/base-input";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/components/atoms/button";
import OpenLayersMap from "@neshan-maps-platform/ol/Map";
import BottomSheet from "@/app/_components/BottomSheet";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Dynamically import the map component to avoid SSR issues
const NeshanMap = dynamic(
  () =>
    import("@neshan-maps-platform/react-openlayers").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 rounded-2xl bg-muted flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
  },
);

interface FormFields {
  id?: number;
  title: string | null;
  text: string | null;
  address_details: string | null;
  longitude: number | null;
  latitude: number | null;
  is_default: boolean;
}

const AddressesPage = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<FormFields>({
    title: null,
    text: null,
    address_details: null,
    longitude: null,
    latitude: null,
    is_default: false,
  });
  const [errorAddress, setErrorAddress] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(13);

  const handleZoom = useCallback((direction: "in" | "out") => {
    if (!mapRef.current?.map) return;

    const view = mapRef.current.map.getView();
    const zoom = view.getZoom() || 13;
    const newZoom = direction === "in" ? zoom + 1 : zoom - 1;

    // Limit zoom levels between 8 (city level) and 18 (building level)
    const limitedZoom = Math.min(Math.max(newZoom, 8), 18);

    view.animate({
      zoom: limitedZoom,
      duration: 250,
    });

    setCurrentZoom(limitedZoom);
  }, []);

  const resetForm = () => {
    setFormFields({
      title: null,
      text: null,
      address_details: null,
      longitude: null,
      latitude: null,
      is_default: false,
    });
  };
  const accountAddressListQuery = useGetAccountAddressList();
  const accountAddressPostMutate = usePostAccountAddress({
    onSuccess: () => {
      setIsAddAddressOpen(false);
      setErrorAddress(null);
      resetForm();
      accountAddressListQuery.refetch();
    },
  });

  const accountAddressPutMutate = usePutAccountAddress({
    onSuccess: () => {
      resetForm();
      setIsAddAddressOpen(false);
      setErrorAddress(null);
      accountAddressListQuery.refetch();
    },
  });

  const accountAddressDeleteMutate = useDeleteAccountAddress({
    onSuccess: () => {
      toast.success("آدرس با موفقیت پاک شد");
      accountAddressListQuery.refetch();
      setOpen(false);
    },
  });
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // const addresses = [
  //   {
  //     id: 1,
  //     title: "خانه",
  //     address: "تهران، خیابان ولیعصر، پلاک 123",
  //     isDefault: true,
  //   },
  //   {
  //     id: 2,
  //     title: "دفتر کار",
  //     address: "تهران، خیابان انقلاب، ساختمان تجاری، طبقه 4",
  //     isDefault: false,
  //   },
  // ];
  console.log(formFields);
  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    setFormFields((prev) => ({ ...prev, latitude: lat, longitude: lng }));

    console.log("Selected location:", { lat, lng });

    try {
      // Convert Web Mercator coordinates to WGS84 if needed
      let finalLat = limit4DigitsBeforeDecimal(lat) as number;
      let finalLng = limit4DigitsBeforeDecimal(lng) as number;

      // Check if coordinates are in Web Mercator format (large numbers)
      if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        console.log("Converting Web Mercator coordinates to WGS84...");
        // Convert Web Mercator to WGS84 - Fixed formula
        const earthRadius = 6378137;
        const maxExtent = earthRadius * Math.PI;

        finalLat =
          (2 * Math.atan(Math.exp(lat / earthRadius)) - Math.PI / 2) *
          (180 / Math.PI);
        finalLng = (lng / maxExtent) * 180;

        console.log("Converted coordinates:", {
          original: { lat, lng },
          converted: { lat: finalLat, lng: finalLng },
        });
      }

      // Check if coordinates are within Iran's bounds
      const isWithinIran =
        finalLat >= 25 && finalLat <= 40 && finalLng >= 44 && finalLng <= 64;

      if (!isWithinIran) {
        console.log(
          "Coordinates outside Iran bounds, using Tehran coordinates as fallback",
        );
        finalLat = 35.6892;
        finalLng = 51.389;
      }

      // Try direct API call first
      let response;
      try {
        response = await fetch(
          `https://api.neshan.org/v5/reverse?lat=${finalLat}&lng=${finalLng}`,
          {
            method: "GET",
            headers: {
              "Api-Key": "service.133cf129eadd46c5958571776318ce57",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
      } catch {
        console.log("CORS error, trying with proxy...");
        // If CORS fails, try with a proxy
        response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.neshan.org/v5/reverse?lat=${finalLat}&lng=${finalLng}`,
          {
            method: "GET",
            headers: {
              "Api-Key": "service.133cf129eadd46c5958571776318ce57",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
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
          formattedAddress = addressParts.join("، ");
        }
      }

      if (formattedAddress) {
        setErrorAddress(null);
        setFormFields((prev) => ({ ...prev, text: formattedAddress }));
      } else {
        setErrorAddress("آدرس یافت نشد");
        setFormFields((prev) => ({ ...prev, text: null }));
      }
    } catch (error) {
      console.error("API Call Error:", error);
      // Fallback to coordinates if API fails
      const fallbackAddress = `موقعیت انتخاب شده: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setErrorAddress(fallbackAddress);
    }
  }, []);

  const handleDeleteAddress = (id: number) => {
    setOpen(true);
    setFormFields((prev) => ({
      ...prev,
      id,
    }));
  };

  const getCurrentLocation = useCallback(() => {
    setIsGettingLocation(true);

    if (!navigator.geolocation) {
      alert("مرورگر شما از GPS پشتیبانی نمی‌کند");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Current location:", { latitude, longitude });

        // Set selected location
        setFormFields((prev) => ({
          ...prev,
          latitude: limit4DigitsBeforeDecimal(latitude),
          longitude: limit4DigitsBeforeDecimal(longitude),
        }));

        // Move map to current location
        if (mapRef.current && mapRef.current.map) {
          try {
            const view = mapRef.current.map.getView();
            view.animate({
              center: [longitude, latitude],
              zoom: 16,
              duration: 1000,
            });
          } catch (error) {
            console.error("Error animating map:", error);
          }
        }

        // Get address for current location
        handleMapClick(latitude, longitude);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "خطا در دریافت موقعیت";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "دسترسی به موقعیت رد شد. لطفاً مجوز دسترسی به موقعیت را فعال کنید.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "اطلاعات موقعیت در دسترس نیست.";
            break;
          case error.TIMEOUT:
            errorMessage = "زمان دریافت موقعیت به پایان رسید.";
            break;
        }

        alert(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }, [handleMapClick]);

  const handleEditAddress = (addressObj: AccountAddressesObj) => {
    setFormFields({
      id: addressObj.id as number,
      title: addressObj.title,
      text: addressObj.text,
      address_details: addressObj.address_details || null,
      is_default: addressObj.is_default,
      latitude: Number(addressObj.latitude),
      longitude: Number(addressObj.longitude),
    });
    setIsAddAddressOpen(true);
  };
  const handleSaveAddress = () => {
    if (
      formFields.text &&
      formFields.longitude !== null &&
      formFields.latitude !== null
    ) {
      const isEdit = !!formFields.id;
      const mutate = isEdit
        ? accountAddressPutMutate
        : accountAddressPostMutate;

      const payload = {
        ...(isEdit && { id: formFields.id }),
        title: formFields.title || "",
        text: formFields.text,
        address_details: formFields.address_details || "",
        longitude: formFields.longitude
          ? limit4DigitsBeforeDecimal(formFields.longitude)?.toString()
          : "",
        latitude: formFields.latitude
          ? limit4DigitsBeforeDecimal(formFields.latitude)?.toString()
          : "",
        is_default: formFields.is_default,
      };

      mutate
        .mutateAsync(payload)
        .then(() => {
          if (isEdit) {
            toast.success("آدرس با موفقیت ویرایش شد");
          } else {
            toast.success("آدرس با موفقیت اضافه شد");
          }
        })
        .catch((error) => {
          console.error("Error saving address:", error);
          toast.error("خطا در ذخیره آدرس");
        });

      console.log("Saving address:", {
        isEdit,
        payload,
        location: formFields.longitude + " , " + formFields.latitude,
      });
    } else {
      toast.error("لطفاً تمام فیلدهای ضروری را پر کنید");
    }
  };

  const onMapInit = useCallback(
    (map: OpenLayersMap) => {
      console.log("Map initialized!", map);

      // Enable mouse wheel zoom
      map.getInteractions().forEach((interaction) => {
        if (interaction.get("type") === "wheel") {
          interaction.setActive(true);
        }
      });

      // Track zoom changes
      map.getView().on("change:resolution", () => {
        const zoom = map.getView().getZoom();
        if (zoom) setCurrentZoom(Math.round(zoom));
      });

      // Handle map drag events
      map.on("movestart", () => {
        setIsDragging(true);
      });

      map.on("moveend", () => {
        setIsDragging(false);
        const view = map.getView();
        const center = view.getCenter();
        if (center) {
          const lat = center[1];
          const lng = center[0];
          handleMapClick(lat, lng);
        }
      });

      // Keep click handler for direct clicks
      map.on("click", (event) => {
        const coordinate = event.coordinate;
        const lat = coordinate[1];
        const lng = coordinate[0];
        handleMapClick(lat, lng);
      });
    },
    [handleMapClick],
  );
  // Clean up when closing bottom sheet
  useEffect(() => {
    if (!isAddAddressOpen) {
      resetForm();
      setErrorAddress("");
    }
  }, [isAddAddressOpen]);

  return (
    <>
      <div
        className="px-4 pt-24 flex flex-col gap-6 min-h-screen bg-background"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <Typography
            variant={"paragraph/md"}
            className="self-center"
            weight="bold"
          >
            آدرس ها
          </Typography>
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
            disabled={accountAddressListQuery.isFetching}
            className="w-full bg-primary disabled:bg-muted disabled:text-white text-primary-foreground py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <IconPlus size={20} />
            <Typography variant={"paragraph/md"} weight="bold">
              افزودن آدرس جدید
            </Typography>
          </button>

          {/* Addresses List */}
          <div
            className="space-y-4"
            style={{ height: "calc(100vh - 270px)", overflowY: "auto" }}
          >
            {accountAddressListQuery.isFetching ? (
              [...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-full h-20 bg-card" />
              ))
            ) : accountAddressListQuery?.data?.data.length ? (
              accountAddressListQuery.data.data.map((address) => (
                <div
                  key={address.id}
                  className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          address.is_default ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <IconMapPin
                          size={24}
                          className={
                            address.is_default
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                      </div>
                      <div>
                        <Typography
                          variant={"paragraph/sm"}
                          weight="bold"
                          className="text-foreground"
                        >
                          {address.title}
                        </Typography>
                        <Typography
                          variant={"paragraph/xs"}
                          className="text-muted-foreground"
                        >
                          {address.text}
                          {address.address_details && (
                            <span className="block mt-1">
                              {address.address_details}
                            </span>
                          )}
                        </Typography>
                      </div>
                    </div>
                    {address.is_default && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                        <IconStar size={12} />
                        پیش‌فرض
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleEditAddress(address);
                      }}
                      className="flex-1 bg-primary/10 text-primary py-2 rounded-xl text-xs font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <IconEdit size={14} />
                      ویرایش
                    </button>
                    <button
                      disabled={address.is_default}
                      onClick={() => {
                        if (!address.is_default)
                          accountAddressPutMutate
                            .mutateAsync({
                              id: address.id,
                              text: address.text,
                              title: address.title,
                              address_details: address.address_details,
                              latitude: address.latitude,
                              longitude: address.longitude,
                              is_default: true,
                            })
                            .then(() => {
                              toast.success("آدرس پیش فرض تنظیم شد");
                            })
                            .catch((error) => {
                              console.error(
                                "Error setting default address:",
                                error,
                              );
                              toast.error("خطا در تنظیم آدرس پیش فرض");
                            });
                      }}
                      className="flex-1 bg-muted text-muted-foreground py-2 disabled:bg-transparent rounded-xl text-xs font-bold hover:bg-muted/80 transition-colors flex items-center justify-center gap-1"
                    >
                      <IconStar size={14} />
                      پیش‌فرض
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteAddress(address.id);
                      }}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Typography variant="label/md" weight="normal">
                  آدرسی یافت نشد
                </Typography>
              </div>
            )}
          </div>
        </div>

        {/* Add Address BottomSheet */}
        <BottomSheet
          isOpen={isAddAddressOpen}
          onClose={() => setIsAddAddressOpen(false)}
        >
          <div className="p-6 space-y-6" dir="rtl">
            <div className="text-center">
              <Typography
                variant={"paragraph/md"}
                weight="bold"
                className="text-foreground"
              >
                افزودن آدرس جدید
              </Typography>
            </div>

            {/* Neshan Map */}
            <div>
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="mb-3 text-foreground"
              >
                انتخاب موقعیت روی نقشه
              </Typography>
              <div className="h-64 rounded-2xl overflow-hidden border border-border relative">
                {isClient && (
                  <>
                    <NeshanMap
                      ref={mapRef}
                      mapKey={process.env.NEXT_PUBLIC_MAP_KEY as string}
                      defaultType="neshan"
                      center={{ latitude: 35.6892, longitude: 51.389 }}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                      onInit={onMapInit}
                      traffic={false}
                      poi={false}
                    />
                    {/* Center Pointer */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                      <div
                        className={`w-8 h-8 rounded-full border-4 border-primary transition-all duration-300 ${
                          isDragging
                            ? "bg-primary/40 scale-110"
                            : "bg-primary/20 "
                        }`}
                      ></div>
                      <div className="w-2 h-2 rounded-full bg-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </>
                )}

                {/* Map Controls */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {/* My Location Button */}
                  <button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    title="موقعیت من"
                  >
                    {isGettingLocation ? (
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <IconLocation size={20} className="text-primary" />
                    )}
                  </button>

                  {/* Zoom Controls */}
                  <div className="bg-white shadow-lg rounded-full flex flex-col">
                    <button
                      onClick={() => handleZoom("in")}
                      disabled={currentZoom >= 18}
                      className="p-2  transition-colors disabled:opacity-50 disabled:hover:bg-white"
                      title="بزرگنمایی"
                    >
                      <IconZoomIn size={20} className="text-primary" />
                    </button>
                    <div className="h-[1px] bg-gray-200"></div>
                    <button
                      onClick={() => handleZoom("out")}
                      disabled={currentZoom <= 8}
                      className="p-2  transition-colors disabled:opacity-50 disabled:hover:bg-white"
                      title="کوچک‌نمایی"
                    >
                      <IconZoomOut size={20} className="text-primary" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <Typography
                  variant={"paragraph/xs"}
                  className="text-muted-foreground text-center"
                >
                  برای انتخاب آدرس، روی نقشه کلیک کنید
                </Typography>
              </div>
            </div>

            {/* Address Details */}

            {/* Manual Address Input */}
            <BaseInput
              dir="rtl"
              className="text-right mb-4 !bg-transparent"
              placeholder="عنوان آدرس"
              type="text"
              name="title"
              value={formFields.title || ""}
              maxLength={11}
              onChange={(e) => {
                setFormFields((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <Typography
              variant={"paragraph/sm"}
              weight="bold"
              className="mb-3 text-foreground"
            >
              یا آدرس را دستی وارد کنید
            </Typography>
            <textarea
              value={errorAddress || formFields.text?.toString()}
              onChange={(e) => {
                setFormFields((prev) => ({
                  ...prev,
                  text: e.currentTarget?.value,
                }));
              }}
              placeholder="آدرس کامل خود را اینجا وارد کنید..."
              className="w-full mb-1 p-4 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground min-h-[100px] resize-none"
            />

            {/* Address Details Field */}
            <BaseInput
              dir="rtl"
              className="text-right mb-4 !bg-transparent"
              placeholder="جزئیات آدرس (پلاک، واحد، طبقه و ...)"
              type="text"
              name="address_details"
              value={formFields.address_details || ""}
              onChange={(e) => {
                setFormFields((prev) => ({
                  ...prev,
                  address_details: e.target.value,
                }));
              }}
            />
            {/* <div className="flex items-center gap-2 flex-row">
              <Typography
                variant={"paragraph/sm"}
                weight="bold"
                className="text-foreground"
              >
                آدرس پیش فرض
              </Typography>
              <Switch
                dir="ltr"
                onChange={(e) => {
                  setFormFields((prev) => ({
                    ...prev,
                    is_default: e.currentTarget.ariaChecked === "true",
                  }));
                }}
              />
            </div> */}
            {/* Save Button */}
            <Button
              onClick={handleSaveAddress}
              disabled={
                !formFields.latitude ||
                !formFields.longitude ||
                !formFields.text ||
                accountAddressPostMutate.isPending ||
                accountAddressPutMutate.isPending
              }
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold disabled:bg-muted disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
            >
              <Typography variant={"paragraph/md"} weight="bold">
                ذخیره آدرس
              </Typography>
            </Button>
          </div>
        </BottomSheet>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center gap-2">
              <IconAlertSquareRounded size={50} className="text-red-500" />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-right">
              آیا از حذف آدرس مطمئنید ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
              disabled={accountAddressDeleteMutate.isPending}
              className="w-full"
            >
              لغو
            </Button>
            <Button
              onClick={() => {
                if (formFields.id)
                  accountAddressDeleteMutate.mutateAsync({ id: formFields.id });
              }}
              isLoading={accountAddressDeleteMutate.isPending}
              disabled={accountAddressDeleteMutate.isPending}
              className="w-full"
            >
              تایید
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddressesPage;

function limit4DigitsBeforeDecimal(value: number) {
  // Make sure it's a number
  const num = +Number(value).toFixed(4);
  if (isNaN(num)) return null; // return null for invalid inputs

  // eslint-disable-next-line prefer-const
  let [integerPart, decimalPart = ""] = Math.abs(num).toString().split(".");

  // Trim integer part if it's more than 4 digits
  if (integerPart.length > 3) {
    integerPart = integerPart.slice(0, 3);
  }

  let result = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  // Restore sign if negative
  if (num < 0) result = `-${result}`;

  return Number(result);
}
