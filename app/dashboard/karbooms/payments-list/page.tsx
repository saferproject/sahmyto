"use client";

import { useState } from "react";
import RejectDrawerComponent from "../_components/reject-drawer-component";
import SearchInputComponent from "../_components/search-input-component";
import PaymentDetailsDrawerLayout from "./_layouts/payment-details-drawer-layout";
import PaymentsListLayout from "./_layouts/payments-list-layout";

export default function PaymentsListPage() {
  const [isPaymentDetailsDrawerOpen, setPaymentDetailsDrawerOpen] =
    useState(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState(false);

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
    <div className="flex h-full w-full flex-col gap-4 pt-26 pb-24">
      <h2 className="text-body text-center text-lg font-semibold">
        لیست درآمد ها
      </h2>
      <SearchInputComponent />
      <PaymentsListLayout
        onOpenForm={}
        onOpenDetails={handleOpenPaymentDtailsDrawer}
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
        isOpen={isIncomeFormDrawerOpen}
        onOpen={handleOpenIncomeForm}
        onClose={handleCloseIncomeForm}
      />
    </div>
  );
}
