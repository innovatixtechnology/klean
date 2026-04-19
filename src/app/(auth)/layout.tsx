import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

function AuthLayout({ children }: Readonly<IProps>) {
  return (
    <section id="auth">
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-lg">
          <Card className={cn("overflow-hidden p-0")}>
            <CardContent className="p-6 md:p-8">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
