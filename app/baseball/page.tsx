"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Bet = {
  id: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    link: string;
    markets: {
      key: string;
      outcomes: {
        name: string;
        price: number;
        point?: number;
      }[];
    }[];
  }[];
};

const API_KEY = "4253565d995f19dd7284b8eb4be3eb57";
const API_URL = "https://api.the-odds-api.com/v4/sports/";

export default function Bets() {
  const { isSignedIn } = useUser();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await axios.get(`${API_URL}/baseball_mlb/odds`, {
          params: {
            apiKey: API_KEY,
            regions: "us",
            oddsFormat: "decimal",
            markets: "spreads",
            dateFormat: "iso",
            includeLinks: true,
          },
        });
        setBets(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="white py-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Apostas de Beisebol
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(9)
                .fill(0)
                .map((_, index) => (
                  <Card key={index} className="bg-[#031E2E]">
                    <CardHeader>
                      <Skeleton className="h-4 w-2/3 bg-[#08426434]" />
                      <Skeleton className="h-4 w-1/2 bg-[#08426434]" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2 bg-[#08426434]" />
                      <Skeleton className="h-4 w-full mb-2 bg-[#08426434]" />
                      <Skeleton className="h-4 w-2/3 bg-[#08426434]" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-100" />
                    </CardFooter>
                  </Card>
                ))
            : bets.slice(0, 12).map((bet) => (
                <Card key={bet.id} className="bg-[#031E2E] border-[#08426434]">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {bet.sport_title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(bet.commence_time).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold mb-2 text-center text-white">
                      {bet.home_team} X {bet.away_team}
                    </p>
                    {bet.bookmakers[0]?.markets.map((market) => (
                      <div key={market.key} className="mb-2">
                        <div className="flex justify-between">
                          {market.outcomes.map((outcome) => (
                            <div key={outcome.name} className="text-center">
                              <p className="font-bold text-white text-center">
                                {outcome.price.toFixed(2)}
                              </p>
                              <p className="text-xs text-white text-center">
                                {outcome.name}{" "}
                                {outcome.point && `(${outcome.point})`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    {bet.bookmakers[0]?.link ? (
                      isSignedIn ? (
                        <Link
                          href={bet.bookmakers[0].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full bg-gray-300 text-[#031E2E] hover:bg-gray-400">
                            Faça sua Aposta
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          className="w-full bg-gray-300 text-[#031E2E]"
                          disabled
                        >
                          Faça login para Apostar
                        </Button>
                      )
                    ) : (
                      <Button className="w-full" disabled>
                        Link Indisponível
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
