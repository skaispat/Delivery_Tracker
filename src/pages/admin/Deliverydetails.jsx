import React, { useState, useEffect } from "react";
import { Calendar, Filter, X, Search, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

const DeliveryOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [filteredPending, setFilteredPending] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    projectName: "",
    partyName: "",
    startDate: "",
    endDate: "",
  });

  const [formData, setFormData] = useState({
    id: null,
    serialNo: "",
    projectName: "",
    partyName: "",
    qty: "",
    poPrice: "",
    poValidation: "",
    otherTerms: "",
    materialType: "",
    date: "",
    partyAddress: "",
    shippingAddress: "",
    gstNo: "",
    consigneeName: "",
    consigneeAddress: "",
  });

  // Format date as dd/MM/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Parse dd/MM/yyyy to Date object
  const parseDate = (dateStr) => {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return new Date(year, month - 1, day);
    } else {
      return new Date(dateStr);
    }
  };

  // Normalize date format for display
  const normalizeDate = (dateStr) => {
    if (dateStr.includes('/')) {
      return dateStr;
    } else {
      return formatDate(new Date(dateStr));
    }
  };

  // Generate OD order number
  const generateOrderNumber = (index) => {
    return `OD-${String(index + 1).padStart(3, '0')}`;
  };

  // Load data on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("deliveryOrderHistory");
    let deliveryHistoryIds = [];
    
    if (savedHistory) {
      const parsedDeliveryHistory = JSON.parse(savedHistory);
      const normalizedDeliveryHistory = parsedDeliveryHistory.map(item => ({
        ...item,
        date: normalizeDate(item.date)
      }));
      setHistoryOrders(normalizedDeliveryHistory);
      setFilteredHistory(normalizedDeliveryHistory);
      deliveryHistoryIds = parsedDeliveryHistory.map(item => item.id);
    }

    const orderRealisationHistory = localStorage.getItem("orderRealisationHistory");
    if (orderRealisationHistory) {
      const parsedHistory = JSON.parse(orderRealisationHistory);
      const filteredOrders = parsedHistory.filter(item => !deliveryHistoryIds.includes(item.id));
      const normalizedHistory = filteredOrders.map(item => ({
        ...item,
        date: normalizeDate(item.date)
      }));
      setPendingOrders(normalizedHistory);
      setFilteredPending(normalizedHistory);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [filters, pendingOrders, historyOrders]);

  const applyFilters = () => {
    const filterItems = (items) => {
      let filtered = [...items];

      if (filters.projectName) {
        filtered = filtered.filter((item) =>
          item.projectName.toLowerCase().includes(filters.projectName.toLowerCase())
        );
      }

      if (filters.partyName) {
        filtered = filtered.filter((item) =>
          item.partyName.toLowerCase().includes(filters.partyName.toLowerCase())
        );
      }

      if (filters.startDate && filters.endDate) {
        filtered = filtered.filter((item) => {
          const itemDate = parseDate(item.date);
          const startDate = new Date(filters.startDate);
          const endDate = new Date(filters.endDate);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }

      return filtered;
    };

    setFilteredPending(filterItems(pendingOrders));
    setFilteredHistory(filterItems(historyOrders));
  };

  const handleClearFilters = () => {
    setFilters({
      projectName: "",
      partyName: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleActionClick = (order, index) => {
    setFormData({
      id: order.id,
      serialNo: order.serialNo,
      projectName: order.projectName,
      partyName: order.partyName,
      qty: order.qty,
      poPrice: order.poPrice,
      poValidation: order.poValidation,
      otherTerms: order.otherTerms,
      materialType: order.materialType,
      date: order.date,
      partyAddress: "",
      shippingAddress: "",
      gstNo: "",
      consigneeName: "",
      consigneeAddress: "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.partyAddress || !formData.shippingAddress || !formData.gstNo) {
      alert("Please fill in all required fields");
      return;
    }

    const historyEntry = {
      id: formData.id,
      serialNo: formData.serialNo,
      date: formData.date,
      projectName: formData.projectName,
      partyName: formData.partyName,
      qty: formData.qty,
      poPrice: formData.poPrice,
      poValidation: formData.poValidation,
      otherTerms: formData.otherTerms,
      materialType: formData.materialType,
      partyAddress: formData.partyAddress,
      shippingAddress: formData.shippingAddress,
      gstNo: formData.gstNo,
      consigneeName: formData.consigneeName,
      consigneeAddress: formData.consigneeAddress,
      completedDate: formatDate(new Date()),
    };

    const updatedHistory = [...historyOrders, historyEntry];
    setHistoryOrders(updatedHistory);
    localStorage.setItem("deliveryOrderHistory", JSON.stringify(updatedHistory));

    const updatedPending = pendingOrders.filter(order => order.id !== formData.id);
    setPendingOrders(updatedPending);

    setFormData({
      id: null,
      serialNo: "",
      projectName: "",
      partyName: "",
      qty: "",
      poPrice: "",
      poValidation: "",
      otherTerms: "",
      materialType: "",
      date: "",
      partyAddress: "",
      shippingAddress: "",
      gstNo: "",
      consigneeName: "",
      consigneeAddress: "",
    });
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      serialNo: "",
      projectName: "",
      partyName: "",
      qty: "",
      poPrice: "",
      poValidation: "",
      otherTerms: "",
      materialType: "",
      date: "",
      partyAddress: "",
      shippingAddress: "",
      gstNo: "",
      consigneeName: "",
      consigneeAddress: "",
    });
    setShowModal(false);
  };

  const currentData = activeTab === "pending" ? filteredPending : filteredHistory;

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Desktop Filters Section - Fixed */}
      <div className="hidden lg:block flex-shrink-0 p-6 bg-gray-50">
        <div className="max-w-full mx-auto">
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex gap-2 items-center">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-3 py-1 text-xs text-gray-700 bg-gray-200 rounded-md transition-colors hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={filters.projectName}
                    onChange={(e) => setFilters({ ...filters, projectName: e.target.value })}
                    placeholder="Search project..."
                    className="py-2 pr-3 pl-10 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Party Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={filters.partyName}
                    onChange={(e) => setFilters({ ...filters, partyName: e.target.value })}
                    placeholder="Search party..."
                    className="py-2 pr-3 pl-10 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    className="py-2 pr-3 pl-10 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    className="py-2 pr-3 pl-10 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header with Filters Toggle - Fixed */}
      <div className="lg:hidden flex-shrink-0 p-4 bg-gray-50 space-y-3">
        <h1 className="text-xl font-bold text-gray-900">Delivery Order</h1>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
            {(filters.projectName || filters.partyName || filters.startDate || filters.endDate) && (
              <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-800 rounded-full">
                Active
              </span>
            )}
          </div>
          {showFilters ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {showFilters && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Project Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={filters.projectName}
                  onChange={(e) => setFilters({ ...filters, projectName: e.target.value })}
                  placeholder="Search project..."
                  className="py-2 pr-3 pl-10 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Party Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={filters.partyName}
                  onChange={(e) => setFilters({ ...filters, partyName: e.target.value })}
                  placeholder="Search party..."
                  className="py-2 pr-3 pl-10 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="py-2 px-3 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="py-2 px-3 w-full text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md transition-colors hover:bg-gray-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Tabs - Fixed */}
      <div className="flex-shrink-0 px-4 lg:px-6 bg-gray-50">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "pending"
                ? "border-red-800 text-red-800"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending ({filteredPending.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "history"
                ? "border-red-800 text-red-800"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            History ({filteredHistory.length})
          </button>
        </div>
      </div>

      {/* Table Section - Scrollable */}
      <div className="flex-1 overflow-hidden px-4 lg:px-6 pb-4 lg:pb-6 pt-4">
        <div className="h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Desktop Table */}
          <div className="hidden lg:block flex-1 overflow-y-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {activeTab === "pending" && (
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                      Action
                    </th>
                  )}
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Order No
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Serial No
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Project Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Party Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Qty
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Po Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Po Validation
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Other Terms
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                    Material Type
                  </th>
                  {activeTab === "history" && (
                    <>
                      <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                        Party Address
                      </th>
                      <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                        Shipping Address
                      </th>
                      <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                        GST No
                      </th>
                      <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                        Consignee Name
                      </th>
                      <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-700 uppercase whitespace-nowrap">
                        Consignee Address
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      {activeTab === "pending" && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleActionClick(item, idx)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-md transition-all hover:opacity-90"
                            style={{ backgroundColor: '#991b1b' }}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Process
                          </button>
                        </td>
                      )}
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {generateOrderNumber(idx)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {item.serialNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {normalizeDate(item.date)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.projectName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {item.partyName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {item.qty}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {item.poPrice}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {item.poValidation}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.otherTerms}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {item.materialType}
                      </td>
                      {activeTab === "history" && (
                        <>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                              {item.partyAddress}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                              {item.shippingAddress}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {item.gstNo}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {item.consigneeName || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                              {item.consigneeAddress || '-'}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeTab === "pending" ? "12" : "16"} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col gap-2 items-center">
                        <Filter className="w-8 h-8 text-gray-400" />
                        <span>No {activeTab} records found</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="flex-1 overflow-y-auto lg:hidden">
            {currentData.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {currentData.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-red-800 mb-1">
                          {generateOrderNumber(idx)}
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {item.serialNo}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">{normalizeDate(item.date)}</span>
                      </div>
                      {activeTab === "pending" && (
                        <button
                          onClick={() => handleActionClick(item, idx)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-md transition-all hover:opacity-90"
                          style={{ backgroundColor: '#991b1b' }}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Process
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2.5">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project</span>
                        <span className="text-sm font-semibold text-gray-900 mt-0.5 break-words">{item.projectName}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Party</span>
                        <span className="text-sm text-gray-900 mt-0.5 break-words">{item.partyName}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quantity</span>
                          <span className="text-sm text-gray-900 mt-0.5 break-words">{item.qty}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Po Price</span>
                          <span className="text-sm text-gray-900 mt-0.5 break-words">{item.poPrice}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Po Validation</span>
                          <span className="text-sm text-gray-900 mt-0.5 break-words">{item.poValidation}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Material Type</span>
                          <span className="text-sm text-gray-900 mt-0.5 break-words">{item.materialType}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Other Terms</span>
                        <span className="text-sm text-gray-900 mt-0.5 break-words">{item.otherTerms}</span>
                      </div>

                      {activeTab === "history" && (
                        <>
                          <div className="pt-2 mt-2 border-t border-gray-200 space-y-2.5">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Party Address</span>
                              <span className="text-sm text-gray-900 mt-0.5 break-words">{item.partyAddress}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Shipping Address</span>
                              <span className="text-sm text-gray-900 mt-0.5 break-words">{item.shippingAddress}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">GST No</span>
                              <span className="text-sm text-gray-900 mt-0.5 break-words">{item.gstNo}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Consignee Name</span>
                              <span className="text-sm text-gray-900 mt-0.5 break-words">{item.consigneeName || '-'}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Consignee Address</span>
                              <span className="text-sm text-gray-900 mt-0.5 break-words">{item.consigneeAddress || '-'}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-12 text-center text-gray-500">
                <div className="flex flex-col gap-3 items-center">
                  <Filter className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700">No {activeTab} records found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-900">Process Delivery Order</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Serial No
                </label>
                <input
                  type="text"
                  name="serialNo"
                  value={formData.serialNo}
                  readOnly
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  readOnly
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Party Name
                </label>
                <input
                  type="text"
                  name="partyName"
                  value={formData.partyName}
                  readOnly
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Qty
                </label>
                <input
                  type="text"
                  name="qty"
                  value={formData.qty}
                  readOnly
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Party Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="partyAddress"
                  value={formData.partyAddress}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  placeholder="Enter party address"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Shipping Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  placeholder="Enter shipping address"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  GST No <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  placeholder="Enter GST number"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Consignee Name <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="consigneeName"
                  value={formData.consigneeName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  placeholder="Enter consignee name"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  Consignee Address <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="consigneeAddress"
                  value={formData.consigneeAddress}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:border-transparent"
                  placeholder="Enter consignee address"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2.5 text-sm font-medium text-white rounded-md transition-all hover:opacity-90"
                style={{ backgroundColor: '#991b1b' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOrder;