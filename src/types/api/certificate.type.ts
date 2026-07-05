export interface MyCertificate {
  id: string;
  serialNo: string;
  issuedAt: string;
  status: "issued" | "revoked";
  course: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    instructor: {
      user: { firstName: string; lastName: string };
    } | null;
  };
}
