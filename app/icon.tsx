import { ImageResponse } from 'next/og'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* This will be replaced with your actual logo */}
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #bc9c22, #d4af37)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    <img src="https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/AC.png" alt="Anshika Caterers Logo" />
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
