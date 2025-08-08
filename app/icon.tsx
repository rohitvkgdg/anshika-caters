import { ImageResponse } from 'next/og'
import { ASSETS } from '@/lib/assets'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
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
                    width={32}
                    height={32}
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>
        ),
        {
            ...size,
        },
    )
}
