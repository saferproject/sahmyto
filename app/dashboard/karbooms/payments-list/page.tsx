"use client";

import { useState } from "react";
import RejectDrawerComponent from "../_components/reject-drawer-component";
import PaymentDrawerComponent from "../_components/payment-drawer-component";
import PaymentDetailsDrawerLayout from "./_layouts/payment-details-drawer-layout";
import PaymentsListLayout from "./_layouts/payments-list-layout";

export default function PaymentsListPage() {
  const [isPaymentFormDrawerOpen, setPaymentFormDrawerOpen] = useState(false);
  const [isPaymentDetailsDrawerOpen, setPaymentDetailsDrawerOpen] =
    useState(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState(false);

  const handleOpenPaymentFormDrawer = () => {
    setPaymentFormDrawerOpen(true);
  };

  const handleClosePaymentFormDrawer = () => {
    setPaymentFormDrawerOpen(false);
  };

  const handleOpenPaymentDtailsDrawer = () => {
    setPaymentDetailsDrawerOpen(true);
  };

  const handleClosePaymentDtailsDrawer = () => {
    setPaymentDetailsDrawerOpen(false);
  };

  const handleOpenRejectDrawer = () => {
    setRejectDrawerOpen(true);
  };

  const handleCloseRejectDrawer = () => {
    setRejectDrawerOpen(false);
  };

  // TODO develope this function
  const handleSubmitReject = () => {};

  return (
    <>
      <PaymentsListLayout
        onOpenForm={handleOpenPaymentFormDrawer}
        onOpenDetails={handleOpenPaymentDtailsDrawer}
        onOpenReject={handleOpenRejectDrawer}
      />
      <PaymentDetailsDrawerLayout
        isOpen={isPaymentDetailsDrawerOpen}
        onOpen={handleOpenPaymentDtailsDrawer}
        onClose={handleClosePaymentDtailsDrawer}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
        title="دریافتی"
        onOpen={handleOpenRejectDrawer}
        onClose={handleCloseRejectDrawer}
        onSubmit={handleSubmitReject}
      />
      <PaymentDrawerComponent
        isOpen={isPaymentFormDrawerOpen}
        onOpen={handleOpenPaymentFormDrawer}
        onClose={handleClosePaymentFormDrawer}
      />
    </>
  );
}
