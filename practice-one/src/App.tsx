import { useState } from "react";

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const ITEMS = [
  { id: 1, name: "사과", category: "과일", price: 3 },
  { id: 2, name: "바나나", category: "과일", price: 2 },
  { id: 3, name: "당근", category: "야채", price: 1 },
  { id: 4, name: "브로콜리", category: "야채", price: 2 },
  { id: 5, name: "우유", category: "유제품", price: 4 },
  { id: 6, name: "치즈", category: "유제품", price: 5 },
];

export default function ItemBrowser() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState<Item | null>(null);
  const [asc, setAsc] = useState<"오름차순" | "내림차순">("오름차순");

  // TODO: 검색 + 카테고리 + 정렬 기능 구현
  const filtered = ITEMS.filter((item) => {
    const matchedItem = item.name.includes(search);
    const matchedCategory = category === "전체" || category === item.category;
    return matchedItem && matchedCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (asc === "내림차순") {
      return b.name.localeCompare(a.name);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="container">
      <h1>Item Browser</h1>

      {/* TODO: 검색 Input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색..."
      />

      {/* TODO: 카테고리 필터 */}
      <select>
        <option onClick={() => setCategory("전체")}>전체</option>
        <option onClick={() => setCategory("과일")}>과일</option>
        <option onClick={() => setCategory("야채")}>야채</option>
        <option onClick={() => setCategory("유제품")}>유제품</option>
      </select>

      {/* TODO: 정렬 버튼 */}
      <button onClick={() => setAsc("오름차순")}>이름 오름차순</button>
      <button onClick={() => setAsc("내림차순")}>이름 내림차순</button>
      <div className="layout" style={{ display: "flex", gap: "20px" }}>
        {/* 리스트 */}
        <ul className="list">
          {sorted.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelected(item)}
              style={{ fontWeight: selected === item ? "bold" : "normal" }}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* 상세보기 */}
        <div className="detail">
          {selected ? (
            <>
              <h2>{selected.name}</h2>
              <p>카테고리: {selected.category}</p>
              <p>가격: {selected.price}</p>
            </>
          ) : (
            <p>아이템을 선택하세요</p>
          )}
        </div>
      </div>
    </div>
  );
}
