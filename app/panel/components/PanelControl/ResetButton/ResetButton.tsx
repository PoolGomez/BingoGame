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
        title: "✅ Correcto",
        description: "Juego Reiniciado",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "❌ Error",
        description: "No se pudo reiniciar el juego... " + error,
        
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
        className="text-lg"
      >
        <RotateCcw />
        {loading ? "Reiniciando..." : "Reiniciar"}
      </Button>
    </div>
  );
}
