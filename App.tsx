import React, { useEffect, useState } from "react";
import Providers from "./components/Providers";
import Routes from "./navigation/Routes";
export interface Bedspaces {
  bedspace: {
    apartmentName: "";
    bedInformation: {
      isDoubleDeck: boolean;
      location?: string;
    };
    imgUrl: string;
    isAvailable: boolean | undefined;
    price: number | string;
    name: string;
    dateUntillAvailable?: string | Date;
  };
  docId?: string;
}

export interface SelectedImage {
  uri?: string;
  name?: string | undefined | null;
}

export interface BookingItems {
  bookingDetails: {
    bookingStatus: string;
    apartmentName: string;
    bedInformation: {
      isDoubleDeck: boolean;
      location: string;
    };
    imgUrl: string;
    name: string;
    price: string | number;
    cancelledBy?: string;
    cancellationDate?: string;
  };
  tenantDetails: {
    firstName: string;
    imageUrl: string;
    lastName: string;
    phoneNumber: string;
    uid: string;
  };
  apartmentRoomsId: string;
  apartmentBookDocId: string;
  tenantBookDocId: string;
  showState?: boolean;
  docId: string;
  createdAt: string;
}

export interface BookingSliceState {
  bookings: {
    bookingDetails: {
      bookingStatus: string;
      apartmentName: string;
      bedInformation: {
        isDoubleDeck: boolean;
        location: string;
      };
      imgUrl: string;
      name: string;
      price: string | number;
      cancelledBy?: string;
      cancellationDate?: string;
    };
    tenantDetails: {
      firstName: string;
      imageUrl: string;
      lastName: string;
      phoneNumber: string;
      uid: string;
      tenantDocId: string;
    };
    apartmentRoomsId: string;
    apartmentBookDocId: string;
    tenantBookDocId: string;
    showState?: boolean;
    docId: string;
    createdAt: string;
  }[];
}

export interface UserSliceInitialState {
  user: {
    docId: string;
    email: string;
    firstName: string;
    imageUrl: string;
    lastName: string;
    password: string;
    phoneNumber: string | number;
    uid: string;
    userType: string;
    apartmentIds: any;
    accountStatus: string;
  };
}
export interface LoadingSliceInitialState {
  loading: boolean;
}

export interface Amenities {
  value: string;
  offering: boolean;
}

export interface ApartmentSpecificationsProps {
  specifications: {
    value?: number | string;
    label: number | string;
    icon: any;
  }[];
  additionalStyle?: string;
}

export interface Amenities {
  offering: boolean;
  value: string;
}

export interface Specifications {
  bathroomCount: string;
  bedspace: string | number;
}

export interface Apartments {
  apartmentInfo: {
    address: string;
    apartmentName: string;
    imageUrl: string;
    geoLocation: {
      latitude: string;
      longitude: string;
    };
    price: {
      from: string;
      to: string;
    };
    description: string;
    amenities: Amenities[];
  };
  landlordInfo: {
    contactNo: string;
    ownerName: string;
  };
  specifications: Specifications;
  docId: string;
  apartmentRoomsId?: string;
}

export type LocationObject = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

export interface VerifyEmailProps {
  isEmailVerified: boolean;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
  userState: any;
}

export interface AppartmentsCardProps {
  apartmentDetails: Apartments;
  navigation: any;
}

export default function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}
