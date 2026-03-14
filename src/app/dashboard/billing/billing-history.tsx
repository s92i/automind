import { BILLING_HISTORY } from "@/components/config/home/items";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bitcoin, CreditCard } from "lucide-react";

const BillingHistory = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-[#121826] border-[#1E293B]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#1E293B]">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Method</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BILLING_HISTORY.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-[#1E293B] hover:bg-[#1E293B]/20"
                >
                  <TableCell className="text-gray-300">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="text-gray-300 font-medium">
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {transaction.method === "Stripe" ? (
                        <CreditCard className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Bitcoin className="w-4 h-4 text-orange-400" />
                      )}
                      <span className="text-gray-300">
                        {transaction.method}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 ">
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingHistory;
