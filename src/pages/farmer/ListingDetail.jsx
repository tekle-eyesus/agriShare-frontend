import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Share2,
  MessageSquare,
  Bell,
  Download,
  Plus,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MilestoneItem from "../../components/farmer/listing-detail/Milestone";
import {
  InvestorRow,
  DistributionRow,
} from "../../components/farmer/listing-detail/Rows";
import {
  TabButton,
  TabContent,
} from "../../components/farmer/listing-detail/Tab";

import PostUpdateModal from "../../components/farmer/listing-detail/PostUpdateModal";
import {
  FinancialTermCard,
  ReviewCard,
  StatCard,
  UpdateCard,
} from "../../components/farmer/listing-detail/Cards";
import {
  investmentData,
  mockInvestors,
  mockReviews,
  mockUpdates,
  pastDistributions,
  shareDistribution,
} from "../../mock-data/farmer/listingDetail";

export function ListingDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "investors", label: "Investors List" },
    { id: "updates", label: "Updates Timeline" },
    { id: "reviews", label: "Reviews" },
    { id: "payouts", label: "Payouts" },
    { id: "analytics", label: "Analytics" },
  ];

  const handlePostUpdate = (update) => {
    console.log("Posting update:", update);
    // Implement API call here
  };

  const handleEditUpdate = (update) => {
    console.log("Edit update:", update);
    // Implement edit logic
  };

  const handleDeleteUpdate = (update) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      console.log("Delete update:", update);
      // Implement delete logic
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-[1536px]">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link to="/listings" className="gap-2 btn btn-ghost btn-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to My Listings
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 shadow-md mb-6 border border-base-200 overflow-hidden card"
        >
          <figure className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop"
              alt="Teff Farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          </figure>

          <div className="p-6 card-body">
            <div className="flex lg:flex-row flex-col justify-between lg:items-start gap-4">
              <div>
                <h1 className="mb-2 font-bold text-2xl lg:text-3xl">
                  Teff Farm - Gozamin Investment
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="gap-1 badge badge-success">
                    <CheckCircle className="w-3 h-3" />
                    Active
                  </div>
                  <Link to="/assets/1" className="text-sm link link-primary">
                    Asset: Teff Farm - Gozamin
                  </Link>
                </div>
              </div>
              <button className="gap-2 btn-outline btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Quick Stats */}
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 mt-6">
              <StatCard
                label="Goal Raised"
                value="65%"
                color="primary"
                icon={TrendingUp}
              />
              <StatCard
                label="Total Invested"
                value="325,000 ETB"
                icon={DollarSign}
              />
              <StatCard label="Investors" value="24" icon={Users} />
              <StatCard label="Days Remaining" value="12" icon={Clock} />
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div className="bg-base-100 shadow-md border border-base-200 card">
          <div className="border-base-200 border-b overflow-x-auto">
            <div className="flex gap-2 p-2 min-w-max">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  value={tab.id}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                >
                  {tab.label}
                </TabButton>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            <TabContent value="overview" activeTab={activeTab}>
              <div>
                <h3 className="mb-3 font-semibold text-lg">Full Description</h3>
                <p className="text-base-content/70 leading-relaxed">
                  Our 5.5-hectare teff farm in Gozamin district has been
                  producing high-quality teff for over 15 years. With modern
                  farming techniques and sustainable practices, we consistently
                  achieve above-average yields. This investment opportunity
                  allows you to participate in our next growing season and share
                  in the profits.
                </p>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-lg">Financial Terms</h3>
                <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <FinancialTermCard label="Share Price" value="1,000 ETB" />
                  <FinancialTermCard label="Total Shares" value="500" />
                  <FinancialTermCard label="Min Investment" value="1 share" />
                  <FinancialTermCard
                    label="Payout Structure"
                    value="Fixed ROI 12%"
                  />
                  <FinancialTermCard label="Frequency" value="Quarterly" />
                  <FinancialTermCard label="Duration" value="12 months" />
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-lg">
                  Progress Milestones
                </h3>
                <div className="space-y-4">
                  <MilestoneItem
                    percentage={25}
                    currentProgress={65}
                    label="Early bird investors"
                  />
                  <MilestoneItem
                    percentage={50}
                    currentProgress={65}
                    label="Half-way milestone"
                  />
                  <MilestoneItem
                    percentage={75}
                    currentProgress={65}
                    label="Almost there!"
                  />
                  <MilestoneItem
                    percentage={100}
                    currentProgress={65}
                    label="Fully funded"
                  />
                </div>
              </div>
            </TabContent>

            {/* Investors Tab */}
            <TabContent value="investors" activeTab={activeTab}>
              <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="font-semibold text-lg">
                  Investor List ({mockInvestors.length} investors)
                </h3>
                <button className="gap-2 btn-outline btn btn-sm">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th className="px-4 py-3">Investor Name</th>
                      <th className="px-4 py-3">Shares Owned</th>
                      <th className="px-4 py-3">Amount Invested</th>
                      <th className="px-4 py-3">Date Invested</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvestors.map((investor) => (
                      <InvestorRow key={investor.id} investor={investor} />
                    ))}
                  </tbody>
                </table>
              </div>
            </TabContent>

            {/* Updates Tab */}
            <TabContent value="updates" activeTab={activeTab}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Updates Timeline</h3>
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="gap-2 btn btn-primary btn-sm"
                >
                  <Plus className="w-4 h-4" />
                  Post New Update
                </button>
              </div>

              <div className="space-y-4">
                {mockUpdates.map((update) => (
                  <UpdateCard
                    key={update.id}
                    update={update}
                    onEdit={handleEditUpdate}
                    onDelete={handleDeleteUpdate}
                  />
                ))}
              </div>
            </TabContent>

            {/* Reviews Tab */}
            <TabContent value="reviews" activeTab={activeTab}>
              <h3 className="mb-6 font-semibold text-lg">Investor Reviews</h3>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </TabContent>

            {/* Payouts Tab */}
            <TabContent value="payouts" activeTab={activeTab}>
              <div className="shadow-lg mb-6 alert alert-success">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">Upcoming Payout</h3>
                  <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-3">
                    <div>
                      <div className="opacity-75 text-xs">
                        Next Distribution
                      </div>
                      <div className="font-semibold">May 15, 2026</div>
                    </div>
                    <div>
                      <div className="opacity-75 text-xs">Estimated Amount</div>
                      <div className="font-semibold text-lg">28,500 ETB</div>
                    </div>
                    <div>
                      <div className="opacity-75 text-xs">
                        Eligible Investors
                      </div>
                      <div className="font-semibold">24</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-lg">
                  Past Distributions
                </h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr className="bg-base-200">
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount Distributed</th>
                        <th className="px-4 py-3">Investors</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastDistributions.map((dist) => (
                        <DistributionRow key={dist.id} distribution={dist} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabContent>

            {/* Analytics Tab */}
            <TabContent value="analytics" activeTab={activeTab}>
              <div>
                <h3 className="mb-4 font-semibold text-lg">
                  Investment Over Time
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={investmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()} ETB`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#2E7D32"
                        strokeWidth={2}
                        name="Investment (ETB)"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-lg">
                  Share Distribution
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={shareDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {shareDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                <div className="bg-base-200/50 card">
                  <div className="p-4 card-body">
                    <div className="text-xs text-base-content/60">
                      Average Investment
                    </div>
                    <div className="font-bold text-xl">13,542 ETB</div>
                  </div>
                </div>
                <div className="bg-base-200/50 card">
                  <div className="p-4 card-body">
                    <div className="text-xs text-base-content/60">
                      Most Active Investor
                    </div>
                    <div className="font-bold text-xl">Mulugeta D.</div>
                  </div>
                </div>
                <div className="bg-base-200/50 card">
                  <div className="p-4 card-body">
                    <div className="text-xs text-base-content/60">
                      Days to Goal
                    </div>
                    <div className="font-bold text-primary text-xl">
                      ~8 days
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>
          </div>
        </div>

        {/* Sticky Action Bar (Mobile) */}
        <div className="lg:hidden right-0 bottom-0 left-0 z-40 fixed flex gap-3 bg-base-100 shadow-lg p-4 border-base-200 border-t">
          <button
            onClick={() => setShowUpdateModal(true)}
            className="flex-1 gap-2 btn btn-primary"
          >
            <Bell className="w-4 h-4" />
            Post Update
          </button>
          <button className="btn-outline btn btn-square">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Post Update Modal */}
        <PostUpdateModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onPost={handlePostUpdate}
        />
      </div>
    </div>
  );
}

export default ListingDetail;
