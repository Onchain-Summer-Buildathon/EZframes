import { NextRequest, NextResponse } from "next/server";
import Transaction from "~~/model/transaction";
import connectDB from "~~/services/connectDB";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const transaction_id = params.id;
  const transaction = await Transaction.findById(transaction_id);
  if (!transaction) {
    return new NextResponse(JSON.stringify({ message: "transaction not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(transaction));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const transaction_id = params.id;
  const payload = await req.json();
  const transaction = await Transaction.findByIdAndUpdate(transaction_id, payload, { new: true });
  if (!transaction) {
    return new NextResponse(JSON.stringify({ message: "transaction not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(transaction));
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const transaction_id = params.id;
  const transaction = await Transaction.findByIdAndDelete(transaction_id);
  if (!transaction) {
    return new NextResponse(JSON.stringify({ message: "transaction not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(transaction));
}
