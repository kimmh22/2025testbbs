import React, { useState } from 'react';
import supabase from '../../utils/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { useImgBoard } from '../../context/ImgBoardContext';
import { useUser } from '../../context/UserContext';

function WriteComp() {
  const { user } = useUser();
  if (!user) {
    return <p>로그인후 이용가능합니다</p>;
  }
  const { getPosts } = useImgBoard();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    content: '',
    user_id: user?.id ?? null,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!user) {
    return <p>로그인후 이용가능합니다</p>;
  }

  // 📌 텍스트 입력 핸들러
  const eventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📌 파일 선택 핸들러
  const fileChangeHandler = (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setFile(imageFile);
    setPreview(URL.createObjectURL(imageFile));
  };

  // 📌 글 작성 버튼
  const clickHandler = (e) => {
    e.preventDefault();

    const createWrite = async () => {
      let fileurl = null;
      let filename = null;

      // 🔥 파일 업로드 처리
      if (file) {
        filename = `${Date.now()}_${file.name}`;

        const { data: storageData, error: storageError } =
          await supabase.storage
            .from('images') // 너의 실제 버킷 이름
            .upload(filename, file); // posts 폴더

        if (storageError) {
          console.error(storageError);
          alert('이미지 업로드 실패');
          return;
        }

        // ⭐ 업로드 후 public URL 생성
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(storageData.path);

        fileurl = publicUrlData.publicUrl;
      }

      // ⭐ DB에 글 + 파일명 + 파일 URL 저장
      const { data, error } = await supabase
        .from('image_bbs')
        .insert([
          {
            title: formData.title,
            name: formData.name || user?.name,
            content: formData.content,
            user_id: formData.user_id,
            filename: filename,
            fileurl: fileurl,
          },
        ])
        .select();

      if (error) {
        console.error(error);
        alert('글 작성 중 오류');
        return;
      }

      alert('글작성성공');
      navigate('/imageboard/list');
      getPosts();
    };

    createWrite();
  };

  return (
    <div>
      <h3>글작성</h3>
      <div>
        <form onSubmit={clickHandler}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="글제목을 입력하세요"
              required
              onChange={eventHandler}
            />
          </div>

          {/* 이미지 업로드 */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              이미지
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              accept="image/*"
              onChange={fileChangeHandler}
            />
          </div>

          {preview && (
            <div className="mb-3">
              <p>미리보기</p>
              <img
                src={preview}
                alt="preview"
                style={{ maxWidth: '200px', display: 'block' }}
              />
            </div>
          )}

          {/* 내용 */}
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              rows="10"
              required
              onChange={eventHandler}
            />
          </div>

          <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
              <Link to="/board/list" className="btn btn-danger">
                취소
              </Link>
              <button className="btn btn-primary">글작성</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteComp;
