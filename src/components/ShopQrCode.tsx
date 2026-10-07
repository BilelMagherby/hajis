import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface ShopQrCodeProps {
  className: string;
  imageClassName: string;
}

export const ShopQrCode: React.FC<ShopQrCodeProps> = ({ className, imageClassName }) => {
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    QRCode.toDataURL('https://hajiss.shop', {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 256,
      color: { dark: '#160D08', light: '#F8F4EC' }
    }).then((url) => {
      if (isActive) setDataUrl(url);
    }).catch((qrError: unknown) => {
      if (isActive) {
        setError(qrError instanceof Error ? qrError.message : 'تعذر إنشاء رمز المتجر.');
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <a
      href="https://hajiss.shop"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="افتح متجر هاجس"
    >
      {dataUrl ? (
        <img className={imageClassName} src={dataUrl} alt="رمز للاستدلال على متجر هاجس" />
      ) : (
        <span className="shop-qr-placeholder" role={error ? 'alert' : undefined}>
          {error || 'جارٍ إنشاء رمز المتجر...'}
        </span>
      )}
    </a>
  );
};
