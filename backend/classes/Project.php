<?php

require_once __DIR__ . '/../db/parametro.php';

class Project
{
    private $conn;
    private $table = 'projects';
    private $uploadDir = __DIR__ . '/../../uploads/';

    public function __construct($conn = null)
    {
        $this->conn = $conn;

        if (!$this->conn) {
            $database = new Database();
            $this->conn = $database->getConnection();
        }

        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0777, true);
        }
    }

    public function read()
    {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function readSingle($id)
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ? LIMIT 1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row ?: ['message' => 'Projeto não encontrado'];
    }

    public function create($data, $files)
    {
        try {
            $imagePath = $this->handleFileUpload($files['image'] ?? null);
            $filePath = $this->handleFileUpload($files['file'] ?? null);

            $query = 'INSERT INTO ' . $this->table . ' 
                     (title, description, discipline, image_path, file_path)
                     VALUES (:title, :description, :discipline, :image_path, :file_path)';

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':title', $data['title'] ?? '');
            $stmt->bindValue(':description', $data['description'] ?? '');
            $stmt->bindValue(':discipline', $data['discipline'] ?? '');
            $stmt->bindValue(':image_path', $imagePath);
            $stmt->bindValue(':file_path', $filePath);

            if ($stmt->execute()) {
                $lastId = $this->conn->lastInsertId();
                return $this->readSingle($lastId);
            }

            return ['error' => 'Erro ao criar projeto'];
        } catch (Exception $e) {
            return ['error' => 'Erro ao criar projeto', 'details' => $e->getMessage()];
        }
    }

    public function update($id, $data, $files)
    {
        try {
            $existingProject = $this->readSingle($id);

            $imagePath = isset($files['image']) ?
                $this->handleFileUpload($files['image'], $existingProject['image_path']) :
                $existingProject['image_path'];

            $filePath = isset($files['file']) ?
                $this->handleFileUpload($files['file'], $existingProject['file_path']) :
                $existingProject['file_path'];

            $query = 'UPDATE ' . $this->table . ' 
                     SET title = :title, 
                         description = :description, 
                         discipline = :discipline, 
                         image_path = :image_path, 
                         file_path = :file_path 
                     WHERE id = :id';

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':title', $data['title'] ?? '');
            $stmt->bindValue(':description', $data['description'] ?? '');
            $stmt->bindValue(':discipline', $data['discipline'] ?? '');
            $stmt->bindValue(':image_path', $imagePath);
            $stmt->bindValue(':file_path', $filePath);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return $this->readSingle($id);
            }

            return ['error' => 'Erro ao atualizar projeto'];
        } catch (Exception $e) {
            return ['error' => 'Erro ao atualizar projeto', 'details' => $e->getMessage()];
        }
    }

    public function delete($id)
    {
        try {
            $project = $this->readSingle($id);

            if (isset($project['image_path'])) {
                $this->deleteFile($project['image_path']);
            }

            if (isset($project['file_path'])) {
                $this->deleteFile($project['file_path']);
            }

            $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return ['success' => true, 'message' => 'Projeto excluído com sucesso'];
            }

            return ['error' => 'Erro ao excluir projeto'];
        } catch (Exception $e) {
            return ['error' => 'Erro ao excluir projeto', 'details' => $e->getMessage()];
        }
    }

    private function handleFileUpload($file, $existingPath = null)
    {
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            return $existingPath;
        }

        if ($existingPath) {
            $this->deleteFile($existingPath);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $targetPath = $this->uploadDir . $filename;

        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            return '/meuprojeto/uploads/' . $filename;
        }

        return null;
    }

    private function deleteFile($filePath)
    {
        // Stored URLs include the app prefix; local deletes only need the filename.
        $fullPath = $this->uploadDir . basename($filePath);

        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }
}
