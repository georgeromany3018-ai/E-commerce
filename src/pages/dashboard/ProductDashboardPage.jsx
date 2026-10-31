import { useState } from "react";
import Header from "./productsDashboardComp/Header";
import DashboardContent from "./productsDashboardComp/DashboardContent";
import SummaryCards from "./productsDashboardComp/SummaryCards";

export default function ProductDashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="product-dashboard-page pb-5">
      <Header onAddProductClick={() => setShowAddModal(true)} />

      <DashboardContent
        showAddModal={showAddModal}
        onHideAddModal={() => setShowAddModal(false)}
      />

      <SummaryCards />
    </div>
  );
}
