export const separateBookings = (arr: any) => {
  const arrCopy = [...arr];
  const pendings: any = [];
  const cancellations: any = [];
  arrCopy.filter((item) => {
    if (item.bookingDetails.bookingStatus === "pending") pendings.push(item);
    else if (item.bookingDetails.bookingStatus === "cancelled")
      cancellations.push(item);
  });
  return { pendings, cancellations };
};
