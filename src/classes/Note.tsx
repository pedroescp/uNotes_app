export interface NoteInterface {
  id: string;
  criadorId: string;
  documentoId: string;
  titulo: string;
  texto: string;
  status: string;
  usuarioAtualizacaoId: string;
  dataAtualizacao: Date;
}
