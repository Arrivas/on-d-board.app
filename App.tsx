import React, { useEffect, useState } from "react";
import Providers from "./components/Providers";
import Routes from "./navigation/Routes";

export interface UserSliceInitialState {
  user: any;
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
  };
  tenantInfo: {
    contactNo: string;
    ownerName: string;
  };
  docId: string;
}

export interface AppartmentsCardProps {
  docId: string;
  imageUrl: string;
  apartmentName: string;
  address: string;
}

export default function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}
