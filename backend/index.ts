import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const app = express();
app.use(cors());
app.use(express.json());

// Usamos POOL para o Neon não derrubar a conexão ociosa
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Garante que o SSL do Neon funcione sempre
});

// Testa a conexão ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erro ao adquirir cliente do pool:', err.stack);
  }
  console.log('🚀 Banco de dados conectado com Pool (Estável)!');
  release(); // Libera a conexão de teste
});

// Trata erros inesperados no pool para o servidor não crashar
pool.on('error', (err) => {
  console.error('⚠️ Erro inesperado no cliente do banco:', err);
});

app.get('/api/setup', async (req, res) => {
  try {
    const charactersRes = await pool.query('SELECT * FROM "Character"');
    const collectionsRes = await pool.query('SELECT * FROM "Collection"');
    const detailsRes = await pool.query('SELECT * FROM "CollectionDetail"');

    const themes = collectionsRes.rows.map(col => ({
      ...col,
      details: detailsRes.rows.filter(d => d.collectionId === col.id)
    }));

    res.json({ themes, characters: charactersRes.rows });
  } catch (error) {
    console.error("❌ Erro na query:", error);
    res.status(500).json({ error: 'Erro ao carregar dados' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n✅ SERVIDOR RODANDO EM http://localhost:${PORT}`);
});