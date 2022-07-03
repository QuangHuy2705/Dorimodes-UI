import en from '../locales/en'
import vn from '../locales/vn'
import pl from '../locales/pl'
import { useRouter } from "next/router";

export const getLanguage = () => {
    const { locale } = useRouter();
    switch (locale) {
        case 'en': return en;
        case 'vn': return vn;
        case 'pl': return pl;
    }
}
