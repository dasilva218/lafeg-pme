import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CategorieText() {
  return (
 
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Catégories principales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1 */}
            <Card className="shadow-md transition-shadow border-2 border-[#dcdaa4]">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e]  flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>
                  Textes législatifs et règlementaires des administrations
                  publiques
                </CardTitle>
                <CardDescription className="text-black">
                  Réglementations et lois encadrant les activités des
                  administrations publiques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-black">
                    • Loi sur les sociétés commerciales
                  </li>
                  <li className="text-black">• Acte uniforme OHADA</li>
                  <li className="text-black">• Formalités d'immatriculation</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/textes-juridiques#administrations">
                  <Button className="w-full gap-1 text-white hover:text-[#063a1e]/90 hover:bg-[#063a1e]/20">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Category 2 */}
            <Card className="shadow-md transition-shadow border-2 border-[#dcdaa4]">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e]  flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>
                  Textes législatifs et règlementaires pour les PME
                </CardTitle>
                <CardDescription className="text-black">
                  Normes et obligations légales spécifiques aux petites et
                  moyennes entreprises.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-black">• Code général des impôts</li>
                  <li className="text-black">• TVA et droits d'accises</li>
                  <li className="text-black">
                    • Avantages fiscaux pour les PME
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/textes-juridiques#pme">
                  <Button className="w-full gap-1 text-white hover:text-[#063a1e]/90 hover:bg-[#063a1e]/20">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Category 3 */}
            <Card className="shadow-md transition-shadow border-2 border-[#dcdaa4]">
              <CardHeader className="pb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e]  flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>
                  Textes juridiques régionaux et internationaux
                </CardTitle>
                <CardDescription className="text-black">
                  Accords, conventions et traités influençant le droit des
                  affaires au niveau mondial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-black">• Code du travail</li>
                  <li className="text-black">• Conventions collectives</li>
                  <li className="text-black">• Protection sociale</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/textes-juridiques#internationaux">
                  <Button className="w-full gap-1 text-white hover:text-[#063a1e]/90 hover:bg-[#063a1e]/20">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
  );
}