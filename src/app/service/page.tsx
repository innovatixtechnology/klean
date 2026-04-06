import { redirect } from "next/navigation";

export const metadata = {
  title: 'Services',
};

export default function Services() {
  return redirect('/')
}