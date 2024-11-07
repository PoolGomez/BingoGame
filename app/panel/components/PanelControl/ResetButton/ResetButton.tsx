import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DeleteCollectionUseCase } from "@/src/application/usecases/DeleteCollectionUseCase";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

export function ResetButton() {
  const [loading, setLoading] = useState(false);

  const handleDeleteCollection = async () => {
    const deleteCollectionUseCase = new DeleteCollectionUseCase();
    setLoading(true);

    try {
      await deleteCollectionUseCase.execute();
      toast({
        title: "OK",
        description: "Juego Reiniciado",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "ERROR",
        description: "No se pudo reiniciar el juego... " + error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        type="button"
        onClick={handleDeleteCollection}
        disabled={loading}
        variant="outline"
      >
        <RotateCcw />
        {loading ? "Reiniciando..." : "Reiniciar"}
      </Button>
    </div>
  );
}
