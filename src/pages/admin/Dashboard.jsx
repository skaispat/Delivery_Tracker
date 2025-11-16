import React, { useState, useEffect } from "react";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Clock,
  RefreshCw,
  Eye,
  X,
  Scale,
  PackageOpen,
  DoorOpen,
  DoorClosed,
  FileCheck,
  AlertTriangle,
  MapPin,
  Navigation
} from "lucide-react";

const Dashboard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    setLoading(true);
    
    try {
      const mockActivities = [
        {
          truckNo: "MH-01-AB-1234",
          driver: "Ramesh Kumar",
          currentLocation: "Mumbai, Maharashtra",
          destination: "Delhi, Delhi",
          status: "In Transit",
          eta: "6 hours",
          lastUpdated: "10 mins ago",
          trackingSteps: [
            { name: "Gate In", time: "Completed at 09:30 AM", status: "completed", icon: DoorOpen, delay: false },
            { name: "Tyre Weighment", time: "Completed at 09:45 AM", status: "completed", icon: Scale, delay: false },
            { name: "Loading", time: "Completed at 10:15 AM", status: "inProgress", icon: PackageOpen, delay: false },
            { name: "Final Weighment", time: "Awaiting processing", status: "pending", icon: Scale, delay: false },
            { name: "Invoicing", time: "Awaiting processing", status: "pending", icon: FileCheck, delay: false },
            { name: "Gate Out", time: "Awaiting processing", status: "pending", icon: DoorClosed, delay: false }
          ]
        },
        {
          truckNo: "TRK-2402",
          driver: "Suresh Patel",
          currentLocation: "Ahmedabad, Gujarat",
          destination: "Bangalore, Karnataka",
          status: "Delivered",
          eta: "Completed",
          lastUpdated: "2 hours ago",
          trackingSteps: [
            { name: "Gate In", time: "Completed at 08:00 AM", status: "completed", icon: DoorOpen, delay: false },
            { name: "Tyre Weighment", time: "Completed at 08:15 AM", status: "completed", icon: Scale, delay: false },
            { name: "Loading", time: "Completed at 09:00 AM - Delayed by 30 mins", status: "completed", icon: PackageOpen, delay: true, delayReason: "Equipment malfunction" },
            { name: "Final Weighment", time: "Completed at 09:30 AM", status: "completed", icon: Scale, delay: false },
            { name: "Invoicing", time: "Completed at 10:00 AM", status: "completed", icon: FileCheck, delay: false },
            { name: "Gate Out", time: "Completed at 10:15 AM", status: "completed", icon: DoorClosed, delay: false }
          ]
        },
        {
          truckNo: "TRK-2403",
          driver: "Anil Mehta",
          currentLocation: "Jaipur, Rajasthan",
          destination: "Kolkata, West Bengal",
          status: "Delayed",
          eta: "12 hours",
          lastUpdated: "30 mins ago",
          trackingSteps: [
            { name: "Gate In", time: "Completed at 07:30 AM", status: "completed", icon: DoorOpen, delay: false },
            { name: "Tyre Weighment", time: "Completed at 07:45 AM", status: "completed", icon: Scale, delay: false },
            { name: "Loading", time: "Delayed - Equipment issue", status: "delayed", icon: PackageOpen, delay: true, delayReason: "Forklift breakdown - maintenance in progress" },
            { name: "Final Weighment", time: "Awaiting processing", status: "pending", icon: Scale, delay: false },
            { name: "Invoicing", time: "Awaiting processing", status: "pending", icon: FileCheck, delay: false },
            { name: "Gate Out", time: "Awaiting processing", status: "pending", icon: DoorClosed, delay: false }
          ]
        },
        {
          truckNo: "TRK-2404",
          driver: "Ramesh Kumar",
          currentLocation: "Pune, Maharashtra",
          destination: "Chennai, Tamil Nadu",
          status: "In Transit",
          eta: "8 hours",
          lastUpdated: "15 mins ago",
          trackingSteps: [
            { name: "Gate In", time: "Completed at 06:00 AM", status: "completed", icon: DoorOpen, delay: false },
            { name: "Tyre Weighment", time: "Completed at 06:20 AM", status: "completed", icon: Scale, delay: false },
            { name: "Loading", time: "Completed at 07:30 AM", status: "completed", icon: PackageOpen, delay: false },
            { name: "Final Weighment", time: "Completed at 08:00 AM", status: "completed", icon: Scale, delay: false },
            { name: "Invoicing", time: "In Progress", status: "inProgress", icon: FileCheck, delay: false },
            { name: "Gate Out", time: "Awaiting processing", status: "pending", icon: DoorClosed, delay: false }
          ]
        },
        {
          truckNo: "TRK-2405",
          driver: "Suresh Patel",
          currentLocation: "Hyderabad, Telangana",
          destination: "Mumbai, Maharashtra",
          status: "Delivered",
          eta: "Completed",
          lastUpdated: "1 hour ago",
          trackingSteps: [
            { name: "Gate In", time: "Completed at 05:30 AM", status: "completed", icon: DoorOpen, delay: false },
            { name: "Tyre Weighment", time: "Completed at 05:45 AM", status: "completed", icon: Scale, delay: false },
            { name: "Loading", time: "Completed at 06:45 AM", status: "completed", icon: PackageOpen, delay: false },
            { name: "Final Weighment", time: "Completed at 07:15 AM", status: "completed", icon: Scale, delay: false },
            { name: "Invoicing", time: "Completed at 07:45 AM", status: "completed", icon: FileCheck, delay: false },
            { name: "Gate Out", time: "Completed at 08:00 AM", status: "completed", icon: DoorClosed, delay: false }
          ]
        },
        {
          truckNo: "TRK-2406",
          driver: "Anil Mehta",
          currentLocation: "Lucknow, Uttar Pradesh",
          destination: "Indore, Madhya Pradesh",
          status: "In Transit",
          eta: "4 hours",
          lastUpdated: "5 mins ago",
          trackingSteps: [
            { name: "Gate In", time: "Completed at 10:00 AM - Delayed by 45 mins", status: "completed", icon: DoorOpen, delay: true, delayReason: "Traffic congestion at gate" },
            { name: "Tyre Weighment", time: "Completed at 10:15 AM", status: "completed", icon: Scale, delay: false },
            { name: "Loading", time: "In Progress", status: "inProgress", icon: PackageOpen, delay: false },
            { name: "Final Weighment", time: "Awaiting processing", status: "pending", icon: Scale, delay: false },
            { name: "Invoicing", time: "Awaiting processing", status: "pending", icon: FileCheck, delay: false },
            { name: "Gate Out", time: "Awaiting processing", status: "pending", icon: DoorClosed, delay: false }
          ]
        }
      ];

      setRecentActivity(mockActivities);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      "In Transit": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Delivered": "bg-green-100 text-green-800 border-green-200",
      "Delayed": "bg-red-100 text-red-800 border-red-200",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleSeeDetails = (activity) => {
    setSelectedVehicle(activity);
    setShowModal(true);
  };

  const filteredActivities = recentActivity.filter(activity => {
    const matchesSearch = 
      activity.truckNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All Status" || activity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: filteredActivities.length,
    inTransit: filteredActivities.filter(a => a.status === "In Transit").length,
    delivered: filteredActivities.filter(a => a.status === "Delivered").length,
    delayed: filteredActivities.filter(a => a.status === "Delayed").length
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-red-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-0.5">{stats.total}</p>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">Total Deliveries</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-md p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-0.5">{stats.inTransit}</p>
            <p className="text-xs sm:text-sm text-yellow-100 font-medium">In Transit</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-0.5">{stats.delivered}</p>
            <p className="text-xs sm:text-sm text-green-100 font-medium">Delivered</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold mb-0.5">{stats.delayed}</p>
            <p className="text-xs sm:text-sm text-red-100 font-medium">Delayed</p>
          </div>
        </div>

        {/* Vehicle Tracking Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Vehicle Tracking</h2>
            <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Search by Truck No or Driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full transition-all"
              />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white w-full sm:w-auto font-medium transition-all"
              >
                <option>All Status</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Delayed</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="block md:hidden max-h-[500px] overflow-y-auto">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12 px-4">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-base font-semibold text-gray-700 mb-2">No matching records found</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="p-3 space-y-3">
                {filteredActivities.map((activity, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Truck className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-bold text-gray-900 truncate">{activity.truckNo}</p>
                          <p className="text-sm text-blue-600 font-semibold truncate">{activity.driver}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap ml-2 border-2 ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    
                    {/* Location Info */}
                    <div className="space-y-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Current Location</p>
                            <p className="text-sm font-semibold text-gray-900 leading-tight">{activity.currentLocation}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 border-2 border-green-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Navigation className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Destination</p>
                            <p className="text-sm font-semibold text-gray-900 leading-tight">{activity.destination}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="font-bold text-gray-900">ETA: {activity.eta}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{activity.lastUpdated}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSeeDetails(activity)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Truck No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Driver Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Current Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Destination</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ETA</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden xl:table-cell">Last Updated</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12">
                      <div className="text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="text-sm text-gray-600 font-medium">No matching records found</p>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredActivities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">{activity.truckNo}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-blue-600">{activity.driver}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                        {activity.currentLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                        {activity.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {activity.eta}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                        {activity.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleSeeDetails(activity)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between flex-shrink-0">
              <div className="flex-1 min-w-0 mr-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Vehicle Tracking Flow</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-red-100 text-sm font-semibold">{selectedVehicle.truckNo}</span>
                  <span className="text-red-200">•</span>
                  <span className="text-red-100 text-sm">{selectedVehicle.driver}</span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-red-800 p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-4">
                {selectedVehicle.trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === selectedVehicle.trackingSteps.length - 1;
                  
                  return (
                    <div key={index} className="relative">
                      <div className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                        step.status === 'completed' && !step.delay ? 'bg-green-50 border-green-300' : 
                        step.status === 'completed' && step.delay ? 'bg-red-50 border-red-300' : 
                        step.status === 'inProgress' ? 'bg-orange-50 border-orange-300' : 
                        step.status === 'delayed' ? 'bg-red-50 border-red-400' :
                        'bg-gray-50 border-gray-300'
                      }`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                          step.status === 'completed' && !step.delay ? 'bg-gradient-to-br from-green-500 to-green-600' : 
                          step.status === 'completed' && step.delay ? 'bg-gradient-to-br from-red-500 to-red-600' : 
                          step.status === 'inProgress' ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 
                          step.status === 'delayed' ? 'bg-gradient-to-br from-red-600 to-red-700' :
                          'bg-gradient-to-br from-gray-400 to-gray-500'
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">{step.name}</h3>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {step.status === 'completed' && !step.delay && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {step.status === 'completed' && step.delay && (
                                <>
                                  <AlertTriangle className="w-5 h-5 text-red-600" />
                                  <CheckCircle className="w-5 h-5 text-red-600" />
                                </>
                              )}
                              {step.status === 'inProgress' && (
                                <Clock className="w-5 h-5 text-orange-600 animate-pulse" />
                              )}
                              {step.status === 'delayed' && (
                                <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
                              )}
                              {step.status === 'pending' && (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                              )}
                            </div>
                          </div>
                          <p className={`text-sm ${
                            step.status === 'completed' && !step.delay ? 'text-green-700 font-medium' : 
                            step.status === 'completed' && step.delay ? 'text-red-700 font-medium' : 
                            step.status === 'inProgress' ? 'text-orange-700 font-medium' : 
                            step.status === 'delayed' ? 'text-red-700 font-semibold' :
                            'text-gray-500'
                          }`}>
                            {step.time}
                          </p>
                          {step.delay && step.delayReason && (
                            <div className="mt-3 p-3 bg-red-100 border-2 border-red-300 rounded-lg">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1">Delay Report</p>
                                  <p className="text-sm text-red-700 leading-relaxed">{step.delayReason}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!isLast && (
                        <div className="ml-6 pl-0.5">
                          <div className={`w-1 h-4 rounded-full ${
                            step.status === 'completed' || step.status === 'inProgress' ? 'bg-green-400' : 
                            step.status === 'delayed' ? 'bg-red-400' : 
                            'bg-gray-300'
                          }`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-base font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;