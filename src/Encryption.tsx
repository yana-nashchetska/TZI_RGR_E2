import React, { useState } from "react";
import CryptoJS from "crypto-js";
import styles from "./Encryption.module.css";

const Encryption: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const encrypt = (text: string, key: string): string => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };

  const decrypt = (ciphertext: string, key: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleEncrypt = () => {
    if (!text || !key) {
      setError("Будь ласка, введіть текст та ключ шифрування.");
      return;
    }
    setError("");
    const encryptedText = encrypt(text, key);
    setResult(encryptedText);
    setIsEncrypted(true);
  };

  const handleDecrypt = () => {
    if (!result || !key) {
      setError("Будь ласка, введіть результат та ключ шифрування.");
      return;
    }
    setError("");
    const decryptedText = decrypt(result, key);
    setResult(decryptedText);
    setIsEncrypted(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Система шифрування E2</h1>
        <input
          type="text"
          placeholder="Введіть текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
        />
        <div className={styles.keyInput}>
          <input
            type={showKey ? "text" : "password"}
            placeholder="Введіть ключ"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showKey ? "🙈" : "👁️"}
          </button>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button
          onClick={handleEncrypt}
          className={`${styles.button} ${
            isEncrypted ? styles.encryptedButton : styles.defaultButton
          }`}
          disabled={isEncrypted}
        >
          Зашифрувати
        </button>
        <button
          onClick={handleDecrypt}
          className={`${styles.button} ${styles.decryptButton}`}
          disabled={!isEncrypted}
        >
          Розшифрувати
        </button>
        <h2>Результат:</h2>
        <p>{result}</p>
        {result && (
          <p>{isEncrypted ? "Текст зашифровано" : "Текст розшифровано"}</p>
        )}
      </div>
    </div>
  );
};

export default Encryption;
