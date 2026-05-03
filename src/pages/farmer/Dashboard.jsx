import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Plus,
  TrendingUp,
  Bell,
  MessageCircle,
  Phone,
  Wallet,
  Coins,
  History,
  Users,
  ArrowRight,
} from "lucide-react";
import {
  mockListings,
  mockInvestorActivity,
  mockUpdates,
  mockNotifications,
} from "../../mock-data/farmer/dashboard";
import { staggerContainer } from "../../utils/motionVariants";
import WelcomeHero from "../../components/farmer/dashboard/WelcomeHero";
import WalletCard from "../../components/farmer/dashboard/WalletCard";
import ListingCard from "../../components/farmer/dashboard/ListingCard";
import EmptyListings from "../../components/farmer/dashboard/EmptyListing";
import {
  ActivityItem,
  UpdateItem,
  NotificationItem,
} from "../../components/farmer/dashboard/Items";
import UpcomingPayout from "../../components/farmer/dashboard/UpcomingPayout";
import QuickAction from "../../components/farmer/dashboard/QuickAction";

const SupportCard = () => {
  return (
    <div className="bg-linear-to-br from-primary to-secondary shadow-md text-white card">
      <div className="p-6 card-body">
        <h3 className="mb-2 font-semibold text-lg card-title">Need Help?</h3>
        <p className="mb-4 text-white/80 text-sm">
          Contact AgriShare support anytime
        </p>
        <div className="flex gap-3">
          <button className="flex-1 gap-2 bg-white/20 hover:bg-white/30 border-none text-white btn btn-sm">
            <MessageCircle className="w-4 h-4" />
            Chat
          </button>
          <button className="flex-1 gap-2 bg-white/20 hover:bg-white/30 border-none text-white btn btn-sm">
            <Phone className="w-4 h-4" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export function Dashboard() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-[1536px]">
        {/* Welcome Hero */}
        <WelcomeHero farmerName="Dawit Tesfaye" isVerified={true} />

        {/* Main Grid Layout */}
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mt-6">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Wallet Summary Row */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="gap-4 grid grid-cols-1 sm:grid-cols-3"
            >
              <WalletCard
                title="Wallet Balance"
                amount="45,230 ETB"
                buttonText="Withdraw"
                buttonAction={() => console.log("Withdraw")}
                icon={Wallet}
                variant="primary"
              />
              <WalletCard
                title="AgriCredits"
                amount="120 Credits"
                buttonText="Buy Credits"
                buttonAction={() => console.log("Buy Credits")}
                icon={Coins}
                variant="secondary"
              />
              <WalletCard
                title="Total Earned"
                amount="1,250,500 ETB"
                buttonText="View History"
                buttonAction={() => console.log("View History")}
                icon={History}
                variant="outline"
              />
            </motion.div>

            {/* Active Listings Section */}
            <div className="bg-base-100 shadow-md border border-base-200 card">
              <div className="p-6 card-body">
                <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="font-semibold text-xl card-title">
                    Your Active Listings
                  </h2>
                  <Link to="/listings" className="gap-2 btn btn-primary">
                    <Plus className="w-4 h-4" />
                    Create New Listing
                  </Link>
                </div>

                {mockListings.length > 0 ? (
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    {mockListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                ) : (
                  <EmptyListings />
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-base-100 shadow-md border border-base-200 card">
              <div className="p-6 card-body">
                <h3 className="mb-4 font-semibold text-lg">Quick Actions</h3>
                <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
                  <QuickAction icon={Plus} label="Create Asset" to="/assets" />
                  <QuickAction
                    icon={TrendingUp}
                    label="New Listing"
                    to="/listings"
                  />
                  <QuickAction
                    icon={Bell}
                    label="Post Update"
                    onClick={() => console.log("Post Update")}
                  />
                  <QuickAction
                    icon={Users}
                    label="View Investors"
                    to="/investors"
                  />
                </div>
              </div>
            </div>

            {/* Recent Investor Activity */}
            <div className="bg-base-100 shadow-md border border-base-200 card">
              <div className="p-6 card-body">
                <h3 className="mb-4 font-semibold text-lg">
                  Recent Investor Activity
                </h3>
                <div className="space-y-2">
                  {mockInvestorActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
                <div className="my-2 divider"></div>
                <Link to="/investors" className="w-full btn btn-ghost btn-sm">
                  View All Activity
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Listing Updates Preview */}
            <div className="bg-base-100 shadow-md border border-base-200 card">
              <div className="p-6 card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Recent Updates</h3>
                  <button className="text-primary text-sm hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {mockUpdates.map((update) => (
                    <UpdateItem key={update.id} update={update} />
                  ))}
                </div>
                <button className="gap-2 mt-4 w-full btn btn-primary">
                  <Bell className="w-4 h-4" />
                  Post New Update
                </button>
              </div>
            </div>

            {/* Upcoming Payouts */}
            <UpcomingPayout />

            {/* Notifications */}
            <div className="bg-base-100 shadow-md border border-base-200 card">
              <div className="p-6 card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  <button className="text-primary text-sm hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {mockNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Support Card */}
            <SupportCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
