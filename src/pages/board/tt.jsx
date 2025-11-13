// import React, { useState } from 'react';
// import supabase from '../../utils/supabase';
// import { Link, useNavigate } from 'react-router-dom';
// import { useBoard } from '../../context/BoardContext';
// import { useUser } from '../../context/UserContext';

// function WriteComp() {
//   const { user } = useUser();

//   if (!user) {
//     return <p>로그인후 이용가능합니다</p>;
//   }

//   const { getPosts } = useBoard();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: '',
//     name: user?.name ?? '',
//     content: '',
//     user_id: user.id,
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const eventHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const fileChangeHandler = (e) => {
//     const imageFile = e.target.files[0];
//     if (!imageFile) return;

//     setFile(imageFile);
//     setPreview(URL.createObjectURL(imageFile));
//   };

//   const clickHandler = (e) => {
//     e.preventDefault();

//     const createWrite = async () => {
//       let imageUrl = null;

//       if (file) {
//         const fileName = `${Date.now()}_${file.name}`;
//         const { data: storageData, error: storageError } =
//           await supabase.storage
//             .from('post-images')
//             .upload(`posts/${fileName}`, file);

//         if (storageError) {
//           console.error(storageError);
//           alert('이미지 업로드 중 오류가 발생했습니다.');
//           return;
//         }

//         const { data: publicUrlData } = supabase.storage
//           .from('post-images')
//           .getPublicUrl(storageData.path);

//         imageUrl = publicUrlData.publicUrl;
//       }

//       const { data, error } = await supabase
//         .from('posts')
//         .insert([
//           {
//             title: formData.title,
//             name: formData.name || user?.name,
//             content: formData.content,
//             user_id: formData.user_id,
//             image_url: imageUrl,
//           },
//         ])
//         .select();

//       if (error) {
//         console.error(error);
//         alert('글 작성 중 오류가 발생했습니다.');
//         return;
//       }

//       alert('글작성성공');
//       navigate('/board/list');
//       getPosts();
//     };

//     createWrite();
//   };

//   return (
//     <div>
//       <h3>글작성</h3>
//       <div>
//         <form onSubmit={clickHandler}>
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">
//               제목
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               className="form-control"
//               placeholder="글제목을 입력하세요"
//               required
//               onChange={eventHandler}
//             />
//           </div>
//           <div>{formData.title}</div>

//           {/* 이미지 업로드 */}
//           <div className="mb-3">
//             <label htmlFor="image" className="form-label">
//               이미지
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="form-control"
//               accept="image/*"
//               onChange={fileChangeHandler}
//             />
//           </div>

//           {preview && (
//             <div className="mb-3">
//               <p>미리보기</p>
//               <img
//                 src={preview}
//                 alt="preview"
//                 style={{ maxWidth: '200px', display: 'block' }}
//               />
//             </div>
//           )}

//           <div className="mb-3">
//             <label htmlFor="content" className="form-label">
//               내용
//             </label>
//             <textarea
//               id="content"
//               name="content"
//               className="form-control"
//               placeholder="내용을 입력하세요"
//               rows="10"
//               required
//               onChange={eventHandler}
//             />
//           </div>
//           <div>{formData.content}</div>

//           <div className="d-flex justify-content-end">
//             <div className="d-flex gap-2">
//               <Link to="/board/list" className="btn btn-danger">
//                 취소
//               </Link>
//               <button className="btn btn-primary">글작성</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default WriteComp;
