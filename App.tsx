import React, { useEffect, useState } from "react";
import Providers from "./components/Providers";
import Routes from "./navigation/Routes";
export interface Bedspaces {
  bedspace: {
    bedInformation: {
      isDoubleDeck: boolean;
      location: string;
    };
    imgUrl: string;
    isAvailable: boolean;
    price: number;
    name: string;
  };
}

export interface UserSliceInitialState {
  user: any;
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
  };
  landlordInfo: {
    contactNo: string;
    ownerName: string;
  };
  specifications: Specifications;
  amenities: Amenities[];
  docId: string;
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
