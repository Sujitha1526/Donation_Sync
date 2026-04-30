import { useAuth } from '@/contexts/AuthContext';
import { mockCertificates } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Award } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';
import { toast } from 'sonner';

export default function CertificatesPage() {
  const { user } = useAuth();
  if (!user) return null;

  const myCerts = mockCertificates.filter(c => c.userId === user.id);

  const handleDownload = (certId: string) => {
    toast.success('Certificate download started (mock)');
    console.log('Download cert:', certId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">My Certificates</h1>
        <p className="text-sm text-muted-foreground">Download your achievement certificates</p>
      </div>

      {myCerts.length === 0 ? (
        <Card className="border-border/50 bg-card">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No certificates earned yet. Keep contributing!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myCerts.map(cert => (
            <Card key={cert.id} className="border-border/50 bg-card hover:border-primary/30 transition-all overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold">{cert.level.charAt(0).toUpperCase() + cert.level.slice(1)} Certificate</h3>
                      <p className="text-xs text-muted-foreground capitalize">{cert.role} Achievement</p>
                    </div>
                  </div>
                  <LevelBadge level={cert.level} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium">{cert.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="font-medium capitalize">{cert.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contributions</p>
                    <p className="font-medium">{cert.contributions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Awarded</p>
                    <p className="font-medium">{cert.awardedAt}</p>
                  </div>
                </div>

                <Button onClick={() => handleDownload(cert.id)} className="w-full gradient-primary border-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
