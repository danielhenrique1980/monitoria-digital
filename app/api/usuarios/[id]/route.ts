import { NextResponse } from 'next/server';
import { pool } from '@monitoriadigital/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection();
    const idUsuario = params.id;

    try {
      // Executa a query de delete
      const [result] = await connection.query(
        'DELETE FROM usuarios WHERE id_usuario = ?',
        [idUsuario]
      );

      // Verifica se algum registro foi afetado
      if ((result as any).affectedRows === 0) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro no banco de dados:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const connection = await pool.getConnection();
    const idUsuario = params.id;

    try {
      // Atualiza o usuário
      const [result] = await connection.query(
        'UPDATE usuarios SET ? WHERE id_usuario = ?',
        [body, idUsuario]
      );

      if ((result as any).affectedRows === 0) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      // Busca o usuário atualizado
      const [updatedUser] = await connection.query(
        'SELECT * FROM usuarios WHERE id_usuario = ?',
        [idUsuario]
      );

      return NextResponse.json(updatedUser[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro no banco de dados:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 }
    );
  }
}
