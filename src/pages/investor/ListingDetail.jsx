import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WALLET } from "../../mock-data/investor/data";
import { formatETB } from "../../utils/format";
import Investment from "../../components/investor/listing-detail/Investment";
import Tabs from "../../components/investor/listing-detail/Tabs";
import ConfirmationModal from "../../components/investor/listing-detail/ConfirmationModal";
import Hero from "../../components/investor/listing-detail/Hero";
import Stats from "../../components/investor/listing-detail/Stats";
import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";

export default function ListingDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { multipleUsers } = useAPI();

  const { data: { data: { listing } = {} } = {}, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => multipleUsers.getListing(id),
  });


  const [tab, setTab] = useState("Overview");
  const [shares, setShares] = useState(1);
  const [confirm, setConfirm] = useState(false);
  const [payment, setPayment] = useState("Wallet");
  const [agree, setAgree] = useState(false);

  if (isLoading) return <div className="p-10 text-center">Loading listing details...</div>;
  if (!listing) return <div className="p-10 text-center text-error">Failed to load listing.</div>;

  const sharePrice = listing.sharePricePerTokenBirr || 0;
  const total = shares * sharePrice;
  const insufficient = payment === "Wallet" && total > WALLET.balance;

  return (
    <div>
      <button
        onClick={() => nav(-1)}
        className="gap-2 mb-3 btn btn-ghost btn-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <Hero listing={listing} />

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mt-6">
        <div className="space-y-6 lg:col-span-2">
          <Stats listing={listing} />

          <Tabs
            tab={tab}
            setTab={setTab}
            listing={listing}
            reviews={reviews}
          />
        </div>

        <Investment
          listing={listing}
          shares={shares}
          setShares={setShares}
          total={total}
          insufficient={insufficient}
          setConfirm={setConfirm}
        />
      </div>

      <ConfirmationModal
        confirm={confirm}
        setConfirm={setConfirm}
        listing={listing}
        shares={shares}
        total={total}
        formatETB={formatETB}
        payment={payment}
        setPayment={setPayment}
        agree={agree}
        setAgree={setAgree}
      />
    </div>
  );
}
