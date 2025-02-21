import { motion } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  ExternalLink,
  Package,
  Users,
} from "lucide-react";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import type { SovendusAppSettings } from "sovendus-integration-types";

import { cn } from "../utils/utils";
import { type AdditionalSteps, DEMO_REQUEST_URL } from "./backend-form";
import { Alert, AlertDescription } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/card";
import { Label } from "./shadcn/label";
import { Switch } from "./shadcn/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn/tabs";

interface SovendusCheckoutProductsProps {
  enabled: boolean;
  setCurrentSettings: Dispatch<SetStateAction<SovendusAppSettings>>;
  additionalSteps?: AdditionalSteps["checkoutProducts"];
}

export function SovendusCheckoutProducts({
  enabled,
  setCurrentSettings,
  additionalSteps,
}: SovendusCheckoutProductsProps): JSX.Element {
  const onStateChange = (checked: boolean): void => {
    setCurrentSettings((prevState) => ({
      ...prevState,
      checkoutProducts: checked,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6 pb-8")}
    >
      <div
        className={cn(
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg",
        )}
      >
        <h2 className={cn("text-3xl font-bold mb-4 text-white")}>
          Checkout Products: Your Gateway to Exponential Growth
        </h2>
        <p className={cn("text-xl mb-6")}>
          Market your products to a network of over 24 million active online
          shoppers every month and see an increase in new customers and sales.
        </p>
        <Button
          size="lg"
          onClick={(): void => void window.open(DEMO_REQUEST_URL, "_blank")}
          className={cn("bg-white text-purple-600 hover:bg-purple-100")}
        >
          Schedule Your Personalized Demo
          <ExternalLink className={cn("ml-2 h-4 w-4")} />
        </Button>
      </div>

      <Alert className={cn("mb-4 bg-blue-50 border-blue-200")}>
        <AlertDescription className={cn("text-blue-700 font-semibold")}>
          <strong>Important:</strong> The first step to activate Checkout
          Products is to contact Sovendus for a personalized demo and setup. Our
          team will guide you through the entire process.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="configure" className={cn("w-full")}>
        <TabsList className={cn("grid w-full grid-cols-3 mb-8")}>
          <TabsTrigger
            value="configure"
            className={cn(
              "text-lg font-semibold py-3 bg-purple-100 data-[state=active]:bg-purple-600 data-[state=active]:text-white",
            )}
          >
            Configure
          </TabsTrigger>
          <TabsTrigger
            value="benefits"
            className={cn(
              "text-lg font-semibold py-3 bg-purple-100 data-[state=active]:bg-purple-600 data-[state=active]:text-white",
            )}
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className={cn(
              "text-lg font-semibold py-3 bg-purple-100 data-[state=active]:bg-purple-600 data-[state=active]:text-white",
            )}
          >
            How It Works
          </TabsTrigger>
        </TabsList>
        <TabsContent value="configure">
          <div className={cn("space-y-6")}>
            {additionalSteps && (
              <Card className={cn("border-2 border-purple-500")}>
                <CardHeader>
                  <CardTitle
                    className={cn("text-xl font-semibold flex items-center")}
                  >
                    <CheckCircle
                      className={cn("w-6 h-6 mr-2 text-purple-500")}
                    />
                    Additional Setup Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className={cn("font-semibold mb-2")}>
                    {additionalSteps.title}
                  </h4>
                  <ol className={cn("list-decimal list-inside space-y-2")}>
                    {additionalSteps.subSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            <div className={cn("flex items-center space-x-4 pt-4 ml-2")}>
              <Switch
                id="checkout-products-enabled"
                checked={enabled}
                onCheckedChange={onStateChange}
              />
              <Label
                htmlFor="checkout-products-enabled"
                className={cn("text-lg font-semibold")}
              >
                Enable Sovendus Checkout Products
              </Label>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="benefits">
          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 mt-6")}>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center text-blue-600")}>
                  <Users className={cn("mr-2 h-5 w-5")} />
                  Massive Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Tap into a network of 300+ partner shops and 185 million
                  annual ad impressions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center text-green-600")}>
                  <Package className={cn("mr-2 h-5 w-5")} />
                  High Conversion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Experience a 1-3% order rate, contributing to 3.6 million
                  orders across our network yearly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={cn("flex items-center text-purple-600")}>
                  <CreditCard className={cn("mr-2 h-5 w-5")} />
                  Risk-Free Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Generate additional income with zero risk, no setup costs, and
                  no minimum contract duration.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="how-it-works">
          <div className={cn("bg-gray-50 p-6 rounded-lg mt-6 space-y-4")}>
            <h3 className={cn("text-2xl font-semibold mb-4")}>
              How Checkout Products Works
            </h3>
            <ol className={cn("space-y-4")}>
              <li className={cn("flex items-start")}>
                <CheckCircle
                  className={cn(
                    "mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("text-lg")}>
                    Seamless Integration:
                  </strong>
                  <p>
                    After your personalized setup with Sovendus, your offers
                    will appear on partner shops' checkout pages, presented as
                    exclusive deals to their customers.
                  </p>
                </div>
              </li>
              <li className={cn("flex items-start")}>
                <CheckCircle
                  className={cn(
                    "mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("text-lg")}>Smart Targeting:</strong>
                  <p>
                    Through data-based targeting, our algorithm presents your
                    offers to the most relevant customers based on their
                    shopping behavior and preferences.
                  </p>
                </div>
              </li>
              <li className={cn("flex items-start")}>
                <CheckCircle
                  className={cn(
                    "mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("text-lg")}>Traffic Boost:</strong>
                  <p>
                    Interested customers click through to your shop, potentially
                    becoming new, high-intent customers and increasing your
                    sales.
                  </p>
                </div>
              </li>
              <li className={cn("flex items-start")}>
                <CheckCircle
                  className={cn(
                    "mr-2 h-5 w-5 text-green-500 mt-1 flex-shrink-0",
                  )}
                />
                <div>
                  <strong className={cn("text-lg")}>
                    Continuous Optimization:
                  </strong>
                  <p>
                    Our team works with you to continuously refine and optimize
                    your campaigns for maximum performance.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
