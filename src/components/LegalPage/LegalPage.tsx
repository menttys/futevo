import React, { useCallback, useRef } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { LegalBlock, LegalKind } from "@/@types/futevo"
import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"
import { MeshBackground } from "@/components/MeshBackground"
import { getLegalDocument } from "@/constants/legal"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useLanguage } from "@/i18n"
import type { LanguageCode } from "@/i18n/i18n"
import { ChevronLeft, ChevronRight } from "@/lib/icons"
import { RootRoutes, TabRoutes } from "@/navigation/routes"
import type { RootStackParamList } from "@/navigation/types/navigation"
import { useUserStore } from "@/store/userState"

import type { LegalPageProps } from "./LegalPage.d"
import { styles } from "./LegalPage.styles"

const LANGUAGE_ORDER: LanguageCode[] = ["en", "es", "pt"]
const pad = (n: number) => String(n).padStart(2, "0")

const OTHER: Record<LegalKind, LegalKind> = { terms: "privacy", privacy: "terms" }
const ROUTE: Record<LegalKind, RootRoutes.TERMS | RootRoutes.PRIVACY> = {
  terms: RootRoutes.TERMS,
  privacy: RootRoutes.PRIVACY,
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <Text style={styles.paragraph}>
        {block.text}
      </Text>
    )
  }
  return (
    <View style={styles.list}>
      {block.items.map((item) => (
        <View key={item} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={[styles.paragraph, styles.listText]}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  )
}

// Public page (signed in or out, no menu): Terms of service and Privacy policy.
export function LegalPage({ kind }: LegalPageProps) {
  const { theme } = useUnistyles()
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const user = useUserStore((s) => s.user)
  const insets = useSafeAreaInsets()
  const wide = useSideTabBar()
  const scrollRef = useRef<ScrollView>(null)
  const offsets = useRef({ grid: 0, article: 0, sections: [] as number[] })

  const doc = getLegalDocument(kind, currentLanguage)
  const other = OTHER[kind]

  const goBack = () => user
    ? navigation.navigate(RootRoutes.MAIN, { screen: TabRoutes.DASHBOARD })
    : navigation.navigate(RootRoutes.LOGIN)
  const open = (target: LegalKind) => {
    if (target !== kind) navigation.replace(ROUTE[target])
  }
  const scrollToSection = useCallback((index: number) => {
    const o = offsets.current
    scrollRef.current?.scrollTo({
      y: Math.max(0, o.grid + o.article + (o.sections[index] ?? 0) - 16),
      animated: true,
    })
  }, [])

  const tab = (target: LegalKind) => (
    <Pressable
      accessibilityRole="link"
      accessibilityState={{ selected: target === kind }}
      onPress={() => open(target)}
      style={styles.tab(target === kind)}
    >
      <Text style={styles.tabLabel}>{t(`legal.${target}`)}</Text>
    </Pressable>
  )

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <MeshBackground />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
        <View style={[styles.content, wide && styles.contentWide]}>
          <View style={styles.header}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={t("legal.backToApp")}
              onPress={goBack}
              style={styles.brand}
            >
              <FutevoMark size={wide ? 30 : 26} />
              <Text style={styles.wordmark}>{t("app.name")}</Text>
            </Pressable>
            <View style={styles.nav}>
              {wide ? (
                <>
                  {tab("terms")}
                  {tab("privacy")}
                </>
              ) : null}
              <AppButton
                label={t("legal.backToApp")}
                labelStyle="body"
                onPress={goBack}
                icon={<ChevronLeft size={16} color={theme.colors.text} />}
                style={styles.back}
              />
            </View>
          </View>
          {wide ? null : <View style={styles.tabsNarrow}>{tab("terms")}{tab("privacy")}</View>}

          <View
            style={[styles.grid, wide && styles.gridWide]}
            onLayout={(e) => {
              offsets.current.grid = e.nativeEvent.layout.y
            }}
          >
            {wide ? (
              <View style={styles.sidebar}>
                <View style={styles.toc}>
                  <Text style={styles.tocLabel}>{t("legal.onThisPage")}</Text>
                  {doc.sections.map((section, i) => (
                    <Pressable
                      key={section.title}
                      accessibilityRole="link"
                      onPress={() => scrollToSection(i)}
                      style={styles.tocItem}
                    >
                      <Text style={styles.tocNumber}>{i + 1}</Text>
                      <Text style={styles.tocText}>{section.title}</Text>
                    </Pressable>
                  ))}
                  <View style={styles.tocDivider} />
                  <Pressable
                    accessibilityRole="link"
                    onPress={() => open(other)}
                    style={styles.tocOther}
                  >
                    <Text style={styles.tocOtherLabel}>{t(`legal.${other}`)}</Text>
                    <ChevronRight size={16} color={theme.colors.text} />
                  </Pressable>
                </View>
              </View>
            ) : null}

            <View
              style={styles.article}
              onLayout={(e) => {
                offsets.current.article = e.nativeEvent.layout.y
              }}
            >
              <Text style={styles.eyebrow}>
                {t("legal.legal")} · {t("legal.lastUpdated", { date: doc.updated })}
              </Text>
              <Text accessibilityRole="header" style={[styles.title, wide && styles.titleWide]}>
                {doc.title}
              </Text>
              <Text style={styles.intro}>{doc.intro}</Text>

              {doc.sections.map((section, i) => (
                <View
                  key={section.title}
                  style={styles.section}
                  onLayout={(e) => {
                    offsets.current.sections[i] = e.nativeEvent.layout.y
                  }}
                >
                  <View style={styles.sectionHead}>
                    <Text style={styles.sectionNumber}>{pad(i + 1)}</Text>
                    <Text accessibilityRole="header" style={styles.sectionTitle}>
                      {section.title}
                    </Text>
                  </View>
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </View>
              ))}

              <View style={styles.footer}>
                <Pressable accessibilityRole="link" onPress={() => open(other)}>
                  <Text style={styles.footerLink}>{t(`legal.${other}`)}</Text>
                </Pressable>
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>
                    {t("legal.copyright", { year: new Date().getFullYear() })}
                  </Text>
                  <View style={styles.footerLanguages}>
                    <Text style={styles.footerText}>{t("legal.available")}</Text>
                    {LANGUAGE_ORDER.map((code) => (
                      <Pressable
                        key={code}
                        accessibilityRole="button"
                        accessibilityState={{ selected: code === currentLanguage }}
                        onPress={() => changeLanguage(code)}
                      >
                        <Text
                          style={[
                            styles.footerText,
                            code === currentLanguage && styles.footerActive,
                          ]}
                        >
                          {languages[code].nativeName}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
