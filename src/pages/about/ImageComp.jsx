import React, { useState } from 'react';
import { toast } from 'react-toastify';
import supabase from '../../utils/supabase';

function ImageComp() {
  const [selectFile, setSelectFile] = useState(null);
  const [message, setMessage] = useState('');

  const fileChangeHandler = (e) => {
    console.log(e.target.files[0]); // ✅ 수정됨
    const file = e.target.files[0];
    setSelectFile(file ?? null);
    setMessage('');
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // ✅ 수정됨
    if (!selectFile) {
      setMessage('이미지를 선택하세요');
      toast('이미지를 선택하세요');
      return;
    }

    const bucket = 'images';
    const filepath = `${Date.now()}_${selectFile.name}`; // ✅ 수정됨

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filepath, selectFile);

    if (error) {
      setMessage('업로드 실패 :' + error.message);
      return;
    }

    toast('업로드 성공!');
  };

  return (
    <div>
      <h3>이미지 업로드</h3>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <input type="file" accept="image/*" onChange={fileChangeHandler} />
          </div>
          <button type="submit">test</button> {/* ✅ 명시적 type */}
          <div>{message && <p className="text-danger mt-2">{message}</p>}</div>
        </form>
      </div>
    </div>
  );
}

export default ImageComp;
