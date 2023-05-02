import React, { useEffect, useState } from "react";
import Providers from "./components/Providers";
import Routes from "./navigation/Routes";
export interface Bedspaces {
  bedspace: {
    bedInformation: {
      isDoubleDeck: boolean;
      location: string;
    };
    imageName: string;
    imgUrl: string;
    isAvailable: boolean;
    price: number;
    name: string;
  };
}

export interface UserSliceInitialState {
  user: any;
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
  tenantInfo: {
    contactNo: string;
    ownerName: string;
  };

  amenities: Amenities[];

  docId: string;
}

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
