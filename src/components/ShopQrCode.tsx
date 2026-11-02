import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../i18n/language';

interface ShopQrCodeProps {
  className: string;
  imageClassName: string;
}

export const ShopQrCode: React.FC<ShopQrCodeProps> = ({ className, imageClassName }) => {
  const { t } = useLanguage();
  const [dataUrl, setDataUrl] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isActive = true;

    QRCode.toDataURL('https://hajiss.shop', {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 256,
      color: { dark: '#191817', light: '#F3EBDD' }
    }).then((url) => {
      if (isActive) setDataUrl(url);
    }).catch((qrError: unknown) => {
      console.error('QR code generation failed:', qrError);
      if (isActive) setFailed(true);
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
      aria-label={t('افتح متجر هاجس', 'Open the Hajiss store')}
    >
      {dataUrl ? (
        <img className={imageClassName} src={dataUrl} alt={t('رمز للاستدلال على متجر هاجس', 'QR code for the Hajiss store')} />
      ) : (
        <span className="shop-qr-placeholder" role={failed ? 'alert' : undefined}>
          {failed
            ? t('تعذر إنشاء رمز المتجر.', 'Could not create the store code.')
            : t('جارٍ إنشاء رمز المتجر...', 'Creating the store code...')}
        </span>
      )}
    </a>
  );
};
