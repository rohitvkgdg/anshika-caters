import { ImageResponse } from 'next/og'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
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
                <div
                    style={{
                        width: 180,
                        height: 180,
                        borderRadius: '20%',
                        background: 'linear-gradient(45deg, #bc9c22, #d4af37)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '72px',
                        fontFamily: 'serif',
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
