import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sampleImg from "../../assets/sample.png";

function ProductUploadPage({ onUpload }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    productName: "",
    totalAmount: "",
    totalQuantity: "",
    userQuantity: "",
    maxParticipants: "",
    description: "",
    productLink: "",
  });

  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const total = Number(form.totalAmount);
    const quantity = Number(form.totalQuantity);
    const userQty = Number(form.userQuantity);
    const perItemPrice = quantity > 0 ? total / quantity : 0;
    const personalPrice = perItemPrice * userQty;
    setPricePerPerson(Math.floor(personalPrice));
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!form.productName || !form.totalAmount || !form.totalQuantity) {
      alert("상품명, 총 금액, 수량은 필수 항목입니다.");
      return;
    }
    const categoryMap = {
      식품: 1,
      생활용품: 2,
      기타: 3,
    };

    const formData = new FormData();
    formData.append("title", form.productName);
    formData.append("description", form.description);
    formData.append("totalAmount", form.totalAmount);
    formData.append("totalQuantity", form.totalQuantity);
    formData.append("myQuantity", form.userQuantity);
    formData.append(
      "pricePerItem",
      Math.floor(Number(form.totalAmount) / Number(form.totalQuantity))
    );
    formData.append("participantLimit", form.maxParticipants);
    formData.append("productUrl", form.productLink);
    formData.append("categoryId", categoryMap[form.category] || 3); // 아래 categoryMap 참고

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/posts/write", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("업로드 실패");
      }

      alert("공동구매 게시글이 등록되었습니다.");
      navigate("/Home");
    } catch (err) {
      console.error("업로드 실패", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <HiddenInput
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label htmlFor="imageUpload">
        <Thumbnail>
          {imagePreview ? (
            <img src={imagePreview} alt="preview" />
          ) : (
            "사진 추가"
          )}
        </Thumbnail>
      </label>

      <Label>카테고리</Label>
      <Select
        name="category"
        value={form.category || ""}
        onChange={handleChange}
      >
        <option value="">선택하세요</option>
        <option value="식품">식품</option>
        <option value="생활용품">생활용품</option>
        <option value="기타">기타</option>
      </Select>

      <Label>상품명</Label>
      <Input
        name="productName"
        value={form.productName || ""}
        onChange={handleChange}
      />

      <Label>총 금액</Label>
      <Input
        name="totalAmount"
        value={form.totalAmount || ""}
        onChange={handleChange}
        type="number"
      />

      <Grid>
        <div style={{ flex: 1 }}>
          <Label>총 수량</Label>
          <Input
            name="totalQuantity"
            value={form.totalQuantity || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>본인이 구매할 수량</Label>
          <Input
            name="userQuantity"
            value={form.userQuantity || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
      </Grid>

      <Grid>
        <div style={{ flex: 1 }}>
          <Label>공구 인원 제한</Label>
          <Input
            name="maxParticipants"
            value={form.maxParticipants || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>1개 당 예상 금액</Label>
          <Input value={pricePerPerson} readOnly />
          <p style={{ fontSize: 11, color: "#ef4444" }}>
            1명 당 예상 금액은 {pricePerPerson.toLocaleString()} 원입니다
          </p>
        </div>
      </Grid>

      <Label>설명</Label>
      <TextArea
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        rows={3}
        placeholder="상세 설명을 입력하세요"
      />

      <Label>상품 링크</Label>
      <Input
        name="productLink"
        value={form.productLink || ""}
        onChange={handleChange}
        placeholder="https://example.com/product"
      />

      <UploadButton onClick={handleUpload}>업로드 하기</UploadButton>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
}

export default ProductUploadPage;

const Container = styled.div`
  width: 390px;
  margin: 0 auto;
  padding: 1rem;
  font-family: sans-serif;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: flex;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  resize: none;
`;

const UploadButton = styled.button`
  width: 100%;
  background: #4d7adb;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 180px;
  background: #ccc;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 1rem;
  color: white;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
