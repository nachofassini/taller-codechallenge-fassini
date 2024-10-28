"use client";

import { Divider } from "@/app/_components/Divider";
import { Payment, SearchFilters } from "./types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Label, Spinner, Table, TextInput } from "flowbite-react";

const mockPayments: Payment[] = [
  { id: "1", date: "2024-10-01", description: "Payment 1", amount: 100 },
  { id: "2", date: "2024-10-02", description: "Payment 2", amount: 200 },
  { id: "3", date: "2024-10-03", description: "Payment 3", amount: 300 },
  { id: "4", date: "2024-10-04", description: "Payment 4", amount: 400 },
  { id: "5", date: "2024-10-05", description: "Payment 5", amount: 500 },
  { id: "6", date: "2024-10-06", description: "Payment 6", amount: 600 },
  { id: "7", date: "2024-10-07", description: "Payment 7", amount: 700 },
  { id: "8", date: "2024-10-08", description: "Payment 8", amount: 800 },
  { id: "9", date: "2024-10-09", description: "Payment 9", amount: 900 },
  { id: "10", date: "2024-10-10", description: "Payment 10", amount: 1000 },
  { id: "11", date: "2024-11-01", description: "Payment 11", amount: 100 },
  { id: "12", date: "2024-11-02", description: "Payment 12", amount: 200 },
  { id: "13", date: "2024-11-03", description: "Payment 13", amount: 300 },
  { id: "14", date: "2024-11-04", description: "Payment 14", amount: 400 },
  { id: "15", date: "2024-11-05", description: "Payment 15", amount: 500 },
  { id: "16", date: "2024-11-06", description: "Payment 16", amount: 600 },
  { id: "17", date: "2024-11-07", description: "Payment 17", amount: 700 },
  { id: "18", date: "2024-11-08", description: "Payment 18", amount: 800 },
  { id: "19", date: "2024-11-09", description: "Payment 19", amount: 900 },
  { id: "20", date: "2024-11-10", description: "Payment 20", amount: 1000 },
];

const mockedPaymentsFetch = async (): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPayments);
    }, 3000);
  });
};

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const fetchPayments = useCallback(async () => {
    setIsError(false);
    setLoading(true);
    try {
      const payments = await mockedPaymentsFetch();
      setPayments(payments);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredPayments = useMemo(() => {
    return payments?.filter((payment) => {
      const paymentDate = new Date(payment.date);
      if (searchFilters.from && searchFilters.to) {
        return (
          paymentDate >= searchFilters.from && paymentDate <= searchFilters.to
        );
      } else if (searchFilters.from) {
        return paymentDate >= searchFilters.from;
      } else if (searchFilters.to) {
        return paymentDate <= searchFilters.to;
      }
      return true;
    });
  }, [payments, searchFilters]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const onSearch = (formData: FormData) => {
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    setSearchFilters({
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
  };

  const cleanSearch = () => {
    formRef.current?.reset();
    setSearchFilters({});
  };

  return (
    <div className="w-full" suppressHydrationWarning>
      <section
        id="header"
        className="flex flex-col md:flex-row justify-between md:items-center"
      >
        <h2 className="text-xl md:text-2xl font-bold">Payments</h2>

        <Divider className="md:hidden" />

        {/* Search by date ranges */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(new FormData(e.target as HTMLFormElement));
          }}
          id="search"
          className="flex gap-4 justify-center items-center"
          ref={formRef}
        >
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <div className="flex gap-4 justify-between items-center">
              <Label htmlFor="from">From</Label>
              <TextInput
                type="date"
                name="from"
                className="flex-1 md:flex-grow-0"
              />
            </div>
            <div className="flex gap-4 justify-between items-center">
              <Label htmlFor="to">To</Label>
              <TextInput
                type="date"
                name="to"
                className="flex-1 md:flex-grow-0"
              />
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <Button type="submit">Filter</Button>
            {(searchFilters.from || searchFilters.to) && (
              <Button outline color="purple" onClick={cleanSearch}>
                Clean
              </Button>
            )}
          </div>
        </form>
      </section>
      <Divider />
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : isError ? (
        <div>
          <p>Error loading payments</p>
          <Button onClick={fetchPayments}>Retry</Button>
        </div>
      ) : filteredPayments?.length > 0 ? (
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {filteredPayments?.map((payment) => (
                <Table.Row key={payment.id}>
                  <Table.Cell>{payment.date}</Table.Cell>
                  <Table.Cell>{payment.description}</Table.Cell>
                  <Table.Cell>{payment.amount}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p>No payments found</p>
      )}
    </div>
  );
}
