export const separateBookings = (arr: any) => {
  const arrCopy = [...arr];
  const pendings: any = [];
  const cancellations: any = [];
  const ongoing: any = [];
  const history: any = [];
  arrCopy.filter((item) => {
    if (item.bookingDetails.bookingStatus === "pending") pendings.push(item);
    else if (item.bookingDetails.bookingStatus === "cancelled")
      cancellations.push(item);
    else if (item.bookingDetails.bookingStatus === "ongoing")
      ongoing.push(item);
    else history.push(item);
  });
  return { pendings, cancellations, ongoing, history };
};
