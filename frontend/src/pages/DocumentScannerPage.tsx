
import { useState, useRef } from "react";
import { Camera, Upload, FileUp, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const DocumentScannerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  // Check if we're resubmitting a document
  const documentId = location.state?.documentId;
  const isResubmission = !!documentId;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Preview the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      toast({
        variant: "destructive",
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera do dispositivo."
      });
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };
  
  const captureImage = () => {
    if (videoRef.current) {
      setIsCapturing(true);
      
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      // Draw the current video frame on the canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Convert the canvas to an image
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageDataUrl);
        
        // Convert the data URL to a File object
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "document-scan.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
          }
        }, "image/jpeg", 0.8);
      }
      
      // Stop the camera
      stopCamera();
      setIsCapturing(false);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione ou capture um documento."
      });
      return;
    }
    
    if (!documentType) {
      toast({
        variant: "destructive",
        title: "Tipo de documento não selecionado",
        description: "Por favor, selecione o tipo de documento."
      });
      return;
    }
    
    // Show loading indicator
    toast({
      title: "Enviando documento",
      description: "Aguarde enquanto processamos seu documento."
    });
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Documento enviado com sucesso!",
        description: isResubmission 
          ? "Seu documento foi reenviado e está em análise." 
          : "Seu documento foi enviado e está em análise."
      });
      
      navigate("/documentos");
    }, 2000);
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setSelectedFile(null);
    setIsCameraActive(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-w1-teal">
          {isResubmission ? "Reenviar Documento" : "Enviar Documento"}
        </h1>
      </div>
      
      {isResubmission && (
        <Card className="border-amber-300 bg-amber-50 mb-4">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <div>
                <p className="font-medium text-amber-800">Você está reenviando um documento</p>
                <p className="text-sm text-amber-700">Por favor, certifique-se de que o documento está legível e atualizado.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="camera">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="camera" className="flex items-center gap-2" onClick={() => capturedImage ? null : startCamera()}>
            <Camera className="h-4 w-4" />
            <span>Capturar</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2" onClick={() => isCameraActive ? stopCamera() : null}>
            <Upload className="h-4 w-4" />
            <span>Arquivo</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera">
          <Card>
            <CardHeader>
              <CardTitle>Capturar Documento com Câmera</CardTitle>
              <CardDescription>Use a câmera para digitalizar seu documento</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {!capturedImage ? (
                <>
                  {isCameraActive ? (
                    <div className="relative w-full max-w-md aspect-[4/3] bg-black rounded-lg overflow-hidden">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 border-2 border-dashed border-white/70 m-4 pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="w-full max-w-md aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center p-4">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Clique no botão abaixo para iniciar a câmera</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full max-w-md relative">
                  <img 
                    src={capturedImage} 
                    alt="Documento capturado" 
                    className="w-full rounded-lg border border-gray-200" 
                  />
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={resetCapture}
                  >
                    Refazer
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!capturedImage ? (
                <>
                  {isCameraActive ? (
                    <Button 
                      className="w-full bg-w1-teal hover:bg-w1-teal/90"
                      onClick={captureImage}
                      disabled={isCapturing}
                    >
                      {isCapturing ? "Capturando..." : "Capturar Documento"}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-w1-teal hover:bg-w1-teal/90"
                      onClick={startCamera}
                    >
                      Iniciar Câmera
                    </Button>
                  )}
                </>
              ) : null}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Arquivo</CardTitle>
              <CardDescription>Selecione um documento do seu dispositivo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {!selectedFile || capturedImage ? (
                <div 
                  className="w-full max-w-md aspect-[4/3] bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*,.pdf" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <FileUp className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-1">Clique para selecionar um arquivo</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG (máx. 10MB)</p>
                </div>
              ) : (
                <div className="w-full max-w-md relative">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center">
                      <FileUp className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium truncate">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-2"
                    onClick={resetCapture}
                  >
                    Escolher outro arquivo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {(selectedFile || capturedImage) && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Documento</CardTitle>
            <CardDescription>Selecione o tipo de documento que está enviando</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-type">Tipo de Documento</Label>
              <Select onValueChange={setDocumentType} value={documentType}>
                <SelectTrigger id="document-type">
                  <SelectValue placeholder="Selecione o tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identity">RG / Identidade</SelectItem>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="proof_of_address">Comprovante de Residência</SelectItem>
                  <SelectItem value="income_tax">Declaração de Imposto de Renda</SelectItem>
                  <SelectItem value="marriage_certificate">Certidão de Casamento</SelectItem>
                  <SelectItem value="property_deed">Escritura de Imóvel</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="document-description">Descrição (opcional)</Label>
              <Input 
                id="document-description" 
                placeholder="Adicione informações sobre o documento"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-w1-teal hover:bg-w1-teal/90"
              onClick={handleUpload}
            >
              {isResubmission ? "Reenviar Documento" : "Enviar Documento"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DocumentScannerPage;
