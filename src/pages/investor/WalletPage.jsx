import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { PageHeader, Card, EmptyState } from "../../components/investor/Shared";
import Modal from "../../components/investor/Modal";
import { WALLET_TXNS } from "../../mock-data/investor/data";
import WithdrawForm from "../../components/investor/wallet/WithdrawForm";
import DepositForm from "../../components/investor/wallet/DepositForm";
import TransactionHistoryTable from "../../components/investor/wallet/TransactionHistoryTable";
import LifeTimeStats from "../../components/investor/wallet/LifeTimeStats";
import AvailableBalanceCard from "../../components/investor/wallet/AvailableBalanceCard";

const TYPES = ["All", "deposit", "withdrawal", "investment", "distribution"];

export default function WalletPage() {
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const filtered = useMemo(
    () =>
      WALLET_TXNS.filter(
        (t) =>
          (type === "All" || t.type === type) &&
          (!search || t.reference.toLowerCase().includes(search.toLowerCase())),
      ),
    [type, search],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const exportCSV = () => {
    const header = "Date,Type,Amount,Status,Reference\n";
    const rows = filtered
      .map((t) => `${t.date},${t.type},${t.amount},${t.status},${t.reference}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div>
      <PageHeader
        title="Wallet & Payments"
        subtitle="Manage deposits, withdrawals, and your transaction history."
      />

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <AvailableBalanceCard
            setDeposit={setDeposit}
            setWithdraw={setWithdraw}
          />

          <LifeTimeStats />
        </div>

        <div className="lg:col-span-2">
          <Card className="p-4" hover={false}>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="font-display font-bold">Transaction history</h3>
              <button
                onClick={exportCSV}
                className="gap-1 btn-outline btn btn-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-3 mt-3">
              <label className="flex items-center gap-2 sm:col-span-2 input input-sm input-bordered">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by reference…"
                  className="bg-transparent outline-none grow"
                />
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
                className="capitalize select-bordered select-sm select"
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </Card>

          {slice.length === 0 ? (
            <Card className="mt-4 p-0" hover={false}>
              <EmptyState
                title="No transactions"
                message="Deposit funds to start investing."
              />
            </Card>
          ) : (
            <TransactionHistoryTable
              slice={slice}
              page={page}
              pages={pages}
              setPage={setPage}
            />
          )}
        </div>
      </div>

      <Modal
        open={deposit}
        onClose={() => setDeposit(false)}
        title="Deposit funds"
        size="md"
      >
        <DepositForm onClose={() => setDeposit(false)} />
      </Modal>
      <Modal
        open={withdraw}
        onClose={() => setWithdraw(false)}
        title="Withdraw funds"
        size="md"
      >
        <WithdrawForm onClose={() => setWithdraw(false)} />
      </Modal>
    </div>
  );
}
