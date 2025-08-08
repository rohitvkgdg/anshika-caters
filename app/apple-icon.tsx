import { ImageResponse } from 'next/og'
import { ASSETS } from '@/lib/assets'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default async function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={ASSETS.logo}
                    alt="Anshika Caterers Logo"
                    width={180}
                    height={180}
                    style={{
                        objectFit: 'contain',
                        borderRadius: '20%',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
