export const Footer = () => {
  return (
    <footer className="bg-background border-t border-orange-600">
      <div className="container flex flex-col items-center justify-center gap-4 py-4">
        <p className="text-sm text-muted-foreground">
          Académie des finances personnelles &copy; 2022 -{" "}
          {new Date().getFullYear()}. Tous droits réservés
        </p>
      </div>
    </footer>
  );
};
