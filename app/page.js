"use client";
import { useState } from "react";
import StampCoupon from "@/component/StampCoupon";
import styles from "./coupon.module.css";

const menuItems = [
  { name: "☕ 아메리카노", price: 4500, coffee: true },
  { name: "🥛 카페라떼", price: 5500, coffee: true },
  { name: "🍰 치즈케이크", price: 6500, coffee: false },
  { name: "🍦 바닐라 라떼", price: 6000, coffee: true, isNew: true },
  { name: "🍫 카페모카", price: 6000, coffee: true, isNew: true },
  { name: "🧊 콜드브루", price: 5000, coffee: true, isNew: true },
  { name: "🧁 초코 머핀", price: 4000, coffee: false, isNew: true },
];
const emptyCart = () => menuItems.map(() => 0);

export default function Home() {
  const [cart, setCart] = useState(emptyCart);
  const [stamps, setStamps] = useState(0);
  const [message, setMessage] = useState("");
  const menus = menuItems.map(item => item.name);
  const prices = menuItems.map(item => item.price);
  const total = cart.reduce((sum, quantity, index) => sum + quantity * prices[index], 0);
  function change(index, delta) {
    setCart(current => current.map((quantity, i) => i === index ? Math.max(0, Math.min(99, quantity + delta)) : quantity));
  }
  function order() {
    if (!total) return;
    const coffee = cart.reduce((sum, quantity, index) => sum + (menuItems[index].coffee ? quantity : 0), 0);
    const earned = Math.min(10 - stamps, coffee);
    setStamps(count => Math.min(10, count + coffee));
    setMessage(`주문 완료! ${total.toLocaleString("ko-KR")}원 · 커피 ${coffee}잔 · 스탬프 ${earned}개 적립${coffee > earned ? " (최대 10개)" : ""}`);
    setCart(emptyCart());
  }
  return (
    <main className={styles.page}>
      <StampCoupon stamps={stamps} setStamps={setStamps} />
      <header className={styles.header}>
        <h1>☕ 루나 카페</h1>
        <p>커피 한 잔과 함께하는 작은 휴식</p>
      </header>
      <section className={styles.menu} aria-labelledby="menu-title">
        <h2 id="menu-title">오늘의 메뉴</h2>
        <ul className={styles.menuGrid}>
          {menus.map((name, index) => <li key={name} className={styles.menuCard}><div><h3>{name}</h3>{menuItems[index].isNew && <small className={styles.newBadge}>NEW</small>}</div><strong>{prices[index].toLocaleString("ko-KR")}원</strong><button type="button" className={styles.addButton} disabled={cart[index] === 99} onClick={() => change(index, 1)} aria-label={`${name} 담기`}>담기</button></li>)}
        </ul>
      </section>
      <section className={styles.menu} aria-labelledby="order-title">
        <h2 id="order-title">내 주문</h2>
        {total === 0 && <p className={styles.description}>주문할 메뉴를 담아주세요.</p>}
        <ul>{menus.map((name, index) => cart[index] > 0 && <li key={name}><span>{name}<br /><strong>{(prices[index] * cart[index]).toLocaleString("ko-KR")}원</strong></span><div className={styles.quantity}><button type="button" onClick={() => change(index, -1)} aria-label={`${name} 수량 줄이기`}>−</button><span>{cart[index]}</span><button type="button" disabled={cart[index] === 99} onClick={() => change(index, 1)} aria-label={`${name} 수량 늘리기`}>+</button></div></li>)}</ul>
        <p className={styles.total}>합계 <strong>{total.toLocaleString("ko-KR")}원</strong></p>
        <div className={styles.actions}><button type="button" disabled={!total} onClick={() => setCart(emptyCart())}>비우기</button><button type="button" className={styles.primary} disabled={!total} onClick={order}>주문하기</button></div>
        <p className={styles.description}>커피 한 잔당 스탬프 1개 적립 · 디저트 제외</p>
        <p className={styles.description}>화면에서 주문을 체험하는 기능입니다.</p>
      </section>
      <p className={styles.orderMessage} role="status" aria-live="polite">{message}</p>

    </main>
  );
}
