
// type TimelineStatus = "completed" | "active" | "upcoming";

// interface TimelineItemProps {
//   title: string;
//   subtitle: string;
//   status: TimelineStatus;
// }

// export const properties = [
//   {
//     id: 1,
//     title: "Pineleaf Phase 2",
//     status: "eligible",
//     date: "15 Jun 2026",
//     plots: 3,
//     price: "2.5M",
//     totalPrice: "45M",
//   },
//   {
//     id: 2,
//     title: "Asaba Topview",
//     status: "offer_sent",
//     date: "20 Jun 2026",
//     plots: 2,
//     price: "1.5M",
//     totalPrice: "20M",
//   },
//   {
//     id: 3,
//     title: "Greenland Estate",
//     status: "completed",
//     date: "10 Jul 2026",
//     plots: 5,
//     price: "5M",
//     totalPrice: "60M",
//   },
//   {
//     id: 4,
//     title: "Greenland Estate",
//     status: "not_eligible",
//     date: "10 Jul 2026",
//     plots: 5,
//     price: "5M",
//     totalPrice: "60M",
//   },
//   {
//     id: 5,
//     title: "Greenland Estate",
//     status: "pending",
//     date: "10 Jul 2026",
//     plots: 5,
//     price: "5M",
//     totalPrice: "60M",
//   },
// ];

// export const plotDetails = [
//     {
//       label: "Price/Plot", value: "₦2.4m"
//     },
//     {
//       label: "Total Value", value: "₦8.4m"
//     },
//     {
//       label: "Plots", value: "3 Plots"
//     }
//   ]

//   export const purchaseProperty = [
//     {
//       label: "Name", value: "Otito"
//     },
//     {

//       label: "Purchase date", value: "07-06-2025"
//     },
//     {
//       label: "Purchse type", value: "Discount"
//     },
//     {
//       label: "Plot numbers", value: "76"
//     },
//   ]

//   export const timelineData: TimelineItemProps[] = [
//   {
//     title: "Property Added",
//     subtitle: "12 Apr 2025",
//     status: "completed",
//   },
//   {
//     title: "Eligibility Reached",
//     subtitle: "12 Apr 2025",
//     status: "completed",
//   },
//   {
//     title: "Buyback Requested",
//     subtitle: "Tap button above to begin",
//     status: "active",
//   },
//   {
//     title: "Offer Sent",
//     subtitle: "Upcoming",
//     status: "upcoming",
//   },
//   {
//     title: "Offer Accepted",
//     subtitle: "Upcoming",
//     status: "upcoming",
//   },
//   {
//     title: "Documents Submitted",
//     subtitle: "Upcoming",
//     status: "upcoming",
//   },
//   {
//     title: "Documents Verified",
//     subtitle: "Upcoming",
//     status: "upcoming",
//   },
//   {
//     title: "Payment Processing",
//     subtitle: "Upcoming",
//     status: "upcoming",
//   },
//   {
//     title: "Paid",
//     subtitle: "Upcoming",
//     status: "upcoming",
//   },
// ];
interface propertiesProps{
  id: number;
  title: string;
  status: string;
  plot: number;
  price: string | number;
  totalPrice: string | number;
}