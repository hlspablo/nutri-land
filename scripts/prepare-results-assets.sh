#!/usr/bin/env bash
#
# prepare-results-assets.sh
#
# Pipeline para normalizar o material bruto da galeria de resultados.
# Lê os arquivos curados em src/assets/marketing/ (source local, não versionado)
# e gera versões web-otimizadas em src/assets/results/ (versionado).
#
# Requer: ffmpeg, sips (macOS nativo). Roda em ~1-2min.
# Idempotente: pode ser re-executado, regenera tudo do zero.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/src/assets/marketing"
DEST="$ROOT/src/assets/results"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

if [[ ! -d "$SOURCE" ]]; then
  echo "ERRO: $SOURCE não existe. Coloque o material bruto lá." >&2
  exit 1
fi

mkdir -p "$DEST"
find "$DEST" -maxdepth 1 -type f \( -name "result-*.jpg" -o -name "testimonial-*.jpg" -o -name "testimonial-*.mp4" \) -delete

# ── IMAGENS ────────────────────────────────────────────────────────────────
# Curadoria: 10 fotos priorizando antes/depois com texto, retratos limpos
# com Dr. Wellington e variedade de pacientes (idade, gênero, contexto).
# Ordem cria ritmo visual no masonry (alto/baixo, com texto / sem texto).
IMAGES=(
  "WhatsApp Image 2026-05-21 at 09.45.57 (1).jpeg|result-01.jpg"  # before/after scrubs com texto
  "WhatsApp Image 2026-05-21 at 09.45.57 (2).jpeg|result-02.jpg"  # 15kg em 4 meses (texto longo)
  "WhatsApp Image 2026-05-21 at 09.45.56.jpeg|result-03.jpg"      # calça larga marrom (dramático)
  "IMG_2080.HEIC|result-04.jpg"                                    # Dr + paciente blonde (alta res HEIC)
  "WhatsApp Image 2026-05-21 at 09.45.56 (1).jpeg|result-05.jpg"  # "A diferença ❤️❤️" antes/depois
  "WhatsApp Image 2026-05-21 at 09.45.58.jpeg|result-06.jpg"      # pink + medição (artístico)
  "WhatsApp Image 2026-05-21 at 09.45.57.jpeg|result-07.jpg"      # Dr 2021 → 2026 transformação
  "WhatsApp Image 2026-05-21 at 09.45.50 (2).jpeg|result-08.jpg"  # senhora na balança (clínico)
  "WhatsApp Image 2026-05-21 at 09.45.47.jpeg|result-09.jpg"      # senhora elegante + Dr
  "WhatsApp Image 2026-05-21 at 09.45.52.jpeg|result-10.jpg"      # paciente masculino (diversidade)
)

echo "▶ Processando imagens (resize ≤1200px, JPEG q82)…"
for entry in "${IMAGES[@]}"; do
  src="${entry%|*}"
  dst="${entry#*|}"
  if [[ ! -f "$SOURCE/$src" ]]; then
    echo "  ✗ $src (não encontrado)" >&2
    continue
  fi
  sips -s format jpeg --resampleHeightWidthMax 1200 -s formatOptions 82 \
    "$SOURCE/$src" --out "$DEST/$dst" >/dev/null
  size=$(stat -f%z "$DEST/$dst")
  printf "  ✓ %-12s (%s KB)\n" "$dst" "$((size / 1024))"
done

# ── VÍDEOS ─────────────────────────────────────────────────────────────────
# Reencode para H.264 mobile-friendly (CRF 26, preset medium, faststart).
# Vídeos verticais → max 720p no lado curto, mantém ratio.

encode_video() {
  local src="$1" dst="$2" poster_at="$3"
  local src_path="$SOURCE/$src"
  if [[ ! -f "$src_path" ]]; then
    echo "  ✗ $src (não encontrado)" >&2
    return
  fi

  echo "  → $dst"
  ffmpeg -y -hide_banner -loglevel error \
    -i "$src_path" \
    -vf "scale='min(720,iw)':'-2':flags=lanczos" \
    -c:v libx264 -crf 26 -preset medium -profile:v main -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 \
    -movflags +faststart \
    "$DEST/$dst.mp4"

  # Poster: frame no ponto poster_at, depois sips para padronizar
  ffmpeg -y -hide_banner -loglevel error \
    -ss "$poster_at" -i "$src_path" \
    -frames:v 1 -q:v 2 \
    "$TMP/$dst.png"
  sips -s format jpeg --resampleHeightWidthMax 1200 -s formatOptions 82 \
    "$TMP/$dst.png" --out "$DEST/$dst.jpg" >/dev/null

  local vsize=$(stat -f%z "$DEST/$dst.mp4")
  local psize=$(stat -f%z "$DEST/$dst.jpg")
  printf "    vídeo: %s KB  |  poster: %s KB\n" "$((vsize / 1024))" "$((psize / 1024))"
}

echo "▶ Processando vídeos (H.264, CRF 26, 720p max, faststart)…"
encode_video "IMG_1600.MOV"                                "testimonial-01" "00:00:45"
encode_video "WhatsApp Video 2026-05-21 at 09.44.54.mp4"   "testimonial-02" "00:00:21"

echo ""
echo "▶ Resultado final:"
ls -lh "$DEST" | tail -n +2
echo ""
echo "Total: $(du -sh "$DEST" | awk '{print $1}')"
