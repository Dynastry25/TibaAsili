// Update this page (the content is just a fallback if you fail to update the page)

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-strong">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Karibu katika 
              <span className="text-primary"> Tiba Asili</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Jukwaa la kisasa la utunzaji wa maudhui ya tiba za asili, makala, na usimamizi wa watumiaji
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-white shadow-medium">
                <Link to="/admin">
                  Ingia Admin Panel
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Jifunze Zaidi
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Vipengele vya Admin Panel</h2>
          <p className="text-muted-foreground">Vipengele vya kisasa vya usimamizi wa website yako</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-medium transition-smooth group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Usimamizi wa Watumiaji</CardTitle>
              <CardDescription>
                Simamia watumiaji, majukumu na ruhusa
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-medium transition-smooth group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-smooth">
                <Heart className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Tiba za Asili</CardTitle>
              <CardDescription>
                Ongeza na simamia tiba za asili na makala
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-medium transition-smooth group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-warning/20 transition-smooth">
                <Shield className="h-6 w-6 text-warning" />
              </div>
              <CardTitle>Usalama</CardTitle>
              <CardDescription>
                Hakikisha usalama wa data na watumiaji
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-medium transition-smooth group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-smooth">
                <Star className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Takwimu</CardTitle>
              <CardDescription>
                Angalia takwimu za matumizi ya website
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-card border-t">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Anza Kusimamia Website Yako Sasa
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Admin panel hii inakuletea vipengele vyote vinavyohitajika kusimamia website ya tiba za asili kwa ufanisi
          </p>
          <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-white shadow-medium">
            <Link to="/admin">
              Ingia Admin Panel
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
